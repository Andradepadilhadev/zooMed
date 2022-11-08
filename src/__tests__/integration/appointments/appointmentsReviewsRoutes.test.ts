import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";
import {
  mockedUser,
  mockedDoctor,
  mockedSpecies,
  mockedAnimal,
  mockedSpeciality,
  mockedClinic,
  mockedAppointment,
  mockedClinicTwo,
  mockedReview,
} from "../../mocks";

describe("Appointments and Reviews Routes", () => {
  let connection: DataSource;
  let validUserToken: string;
  let validDoctorToken: string;
  const invalidToken = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    //create a user and login
    await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app)
      .post("/login")
      .send({ email: mockedUser.email, password: mockedUser.password });
    validUserToken = userLogin.body.token;

    // create a doctor and login
    await request(app).post("/doctors").send(mockedDoctor);
    const doctorLogin = await request(app)
      .post("/login")
      .send({ email: mockedDoctor.email, password: mockedDoctor.password });
    validDoctorToken = doctorLogin.body.token;

    //create a apeciality
    await request(app)
      .post("/doctors/specialities")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedSpeciality);

    //create a species
    await request(app)
      .post("/animals/species")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedSpecies);

    //get the species name
    const species = await request(app)
      .get("/animals/species")
      .set("Authorization", `Bearer ${validUserToken}`);
    const speciesName = species.body[0].name;

    //create an animal
    mockedAnimal.species = speciesName;
    await request(app)
      .post("/animals")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(mockedAnimal);

    //create a clinic
    await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedClinic);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users/appointments - Must not be able to create appointment without token or with invalid token", async () => {
    const animalsList = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);
    const animalId = animalsList.body[0].id;

    const doctorsList = await request(app).get("/doctors");
    const clinicsDoctorsId = doctorsList.body[0].clinicsDoctors[0].id;

    mockedAppointment.animalId = animalId;
    mockedAppointment.clinicsDoctorsId = clinicsDoctorsId;

    const responseNoToken = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment);
    const responseInvalidToken = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer${invalidToken}`);

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");
    expect(responseInvalidToken.status).toBe(403);
    expect(responseInvalidToken.body).toHaveProperty("message");
  });

  test("POST /users/appointments - Must not be able to create appointment without animal id or incorrect animal id", async () => {
    const doctorsList = await request(app).get("/doctors");
    const clinicsDoctorsId = doctorsList.body[0].clinicsDoctors[0].id;

    mockedAppointment.clinicsDoctorsId = clinicsDoctorsId;

    mockedAppointment.animalId = "";
    const responseNoId = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer ${validUserToken}`);

    mockedAppointment.animalId = "10";
    const responseInvalidId = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(responseNoId.status).toBe(400);
    expect(responseNoId.body).toHaveProperty("message");
    expect(responseInvalidId.status).toBe(400);
    expect(responseInvalidId.body).toHaveProperty("message");
  });

  test("POST /users/appointments - Must not be able to create appointment without clinicsDoctors id or incorrect clinicsDoctors id", async () => {
    const animalsList = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);
    mockedAppointment.animalId = animalsList.body[0].id;

    mockedAppointment.clinicsDoctorsId = "";
    const responseNoId = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer ${validUserToken}`);

    mockedAppointment.clinicsDoctorsId = "10";
    const responseInvalidId = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(responseNoId.status).toBe(400);
    expect(responseNoId.body).toHaveProperty("message");
    expect(responseInvalidId.status).toBe(400);
    expect(responseInvalidId.body).toHaveProperty("message");
  });

  test("POST /users/appointments - Must not be able to create a appointment with invalid date or hour", async () => {
    const animalsList = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);
    mockedAppointment.animalId = animalsList.body[0].id;

    const doctorsList = await request(app).get("/doctors");
    mockedAppointment.clinicsDoctorsId =
      doctorsList.body[0].clinicsDoctors[0].id;

    mockedAppointment.date = "20/03/2020";
    const responseInvalidDate = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer ${validUserToken}`);

    mockedAppointment.date = "2020/03/20";
    mockedAppointment.hour = "10h";
    const responseInvalidHour = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(responseInvalidDate.status).toBe(400);
    expect(responseInvalidDate.body).toHaveProperty("message");
    expect(responseInvalidHour.status).toBe(400);
    expect(responseInvalidHour.body).toHaveProperty("message");
  });

  test("POST /users/appointments - Must be able to create appointment", async () => {
    const animalsList = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);
    mockedAppointment.animalId = animalsList.body[0].id;

    const doctorsList = await request(app).get("/doctors");
    mockedAppointment.clinicsDoctorsId =
      doctorsList.body[0].clinicsDoctors[0].id;

    mockedAppointment.hour = "10:00";
    const response = await request(app)
      .post("/users/appointments")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(mockedAppointment);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users/appointments - Must not be able to create a appointment with existing date, hour and doctor", async () => {
    await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedClinicTwo);

    const animalsList = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);
    mockedAppointment.animalId = animalsList.body[0].id;

    const doctorsList = await request(app).get("/doctors");
    mockedAppointment.clinicsDoctorsId =
      doctorsList.body[0].clinicsDoctors[1].id;

    const response = await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users/appointments - Must not me able to list appointments without token or with invalid token", async () => {
    const responseNoToken = await request(app).get("/users/appointments");

    const responseInvalidToken = await request(app)
      .get("/users/appointments")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");
    expect(responseInvalidToken.status).toBe(403);
    expect(responseInvalidToken.body).toHaveProperty("message");
  });

  test("GET /users/appointments - Must be able to list the users appointments", async () => {
    const response = await request(app)
      .get("/users/appointments")
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /doctors/appointments - Must be able to list the doctors appointments", async () => {
    const response = await request(app)
      .get("/doctors/appointments")
      .set("Authorization", `Bearer ${validDoctorToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("POST /users/reviews - Must not be able to create review of an appointment that didn't happen yet", async () => {
    const animalsList = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);
    mockedAppointment.animalId = animalsList.body[0].id;

    const doctorsList = await request(app).get("/doctors");
    mockedAppointment.clinicsDoctorsId =
      doctorsList.body[0].clinicsDoctors[0].id;

    mockedAppointment.date = "2024/11/02";

    await request(app)
      .post("/users/appointments")
      .send(mockedAppointment)
      .set("Authorization", `Bearer ${validUserToken}`);

    const appointmentsList = await request(app)
      .get("/users/appointments")
      .set("Authorization", `Bearer ${validUserToken}`);
    mockedReview.appointmentId = appointmentsList.body[1].id;

    const response = await request(app)
      .post("/users/reviews")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(mockedReview);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users/reviews - Must be able to create an appointment review", async () => {
    const appointmentsList = await request(app)
      .get("/users/appointments")
      .set("Authorization", `Bearer ${validUserToken}`);
    mockedReview.appointmentId = appointmentsList.body[0].id;

    const response = await request(app)
      .post("/users/reviews")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(mockedReview);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("review");
    expect(response.body.review).toHaveProperty("id");
    expect(response.body.review.review).toEqual(mockedReview.review);
  });

  test("POST /users/reviews - Must not be ale to create a existing appointment review", async () => {
    const appointmentsList = await request(app)
      .get("/users/appointments")
      .set("Authorization", `Bearer ${validUserToken}`);
    mockedReview.appointmentId = appointmentsList.body[0].id;

    const response = await request(app)
      .post("/users/reviews")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(mockedReview);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /reviews - Must be able to list all users reviews", async () => {
    const response = await request(app)
      .get("/users/reviews")
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /doctors/reviews - Must be able to get all reviews from logged doctor", async () => {
    const response = await request(app)
      .get("/doctors/reviews")
      .set("Authorization", `Bearer ${validDoctorToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("PATCH /users/reviews/:id - Must be able to update the review", async () => {
    const reviewsList = await request(app)
      .get("/users/reviews")
      .set("Authorization", `Bearer ${validUserToken}`);
    const reviewId = reviewsList.body[0].id;

    const response = await request(app)
      .patch(`/users/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${validUserToken}`)
      .send({ review: "Consulta devidamente avaliada." });

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(reviewId);
    expect(response.body.review).toEqual("Consulta devidamente avaliada.");
  });

  test("PATCH /users/reviews/:id - Must not be able to update review id", async () => {
    const reviewsList = await request(app)
      .get("/users/reviews")
      .set("Authorization", `Bearer ${validUserToken}`);
    const reviewId = reviewsList.body[0].id;

    const response = await request(app)
      .patch(`/users/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${validUserToken}`)
      .send({ id: "100" });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/appointments/:id - Must not be able to cancel appointment without token or with invalid token", async () => {
    const appointmentsList = await request(app)
      .get("/users/appointments")
      .set("Authorization", `Bearer ${validUserToken}`);
    const appointmentId = appointmentsList.body[1].id;

    const responseNoToken = await request(app).patch(
      `/users/appointments/${appointmentId}`
    );
    const responseInvalidToken = await request(app)
      .patch(`/users/appointments/${appointmentId}`)
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");
    expect(responseInvalidToken.status).toBe(403);
    expect(responseInvalidToken.body).toHaveProperty("message");
  });

  test("PATCH /users/appointments/:id - Must be able to cancel the appointment with user login", async () => {
    const appointmentsList = await request(app)
      .get("/users/appointments")
      .set("Authorization", `Bearer ${validUserToken}`);
    const appointmentId = appointmentsList.body[0].id;

    const response = await request(app)
      .patch(`/users/appointments/${appointmentId}`)
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /doctors/appointments/:id - Must be able to cancel the appointment with doctor login", async () => {
    const appointmentsList = await request(app)
      .get("/doctors/appointments")
      .set("Authorization", `Bearer ${validDoctorToken}`);
    const appointmentId = appointmentsList.body[1].id;

    const response = await request(app)
      .patch(`/doctors/appointments/${appointmentId}`)
      .set("Authorization", `Bearer ${validDoctorToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
