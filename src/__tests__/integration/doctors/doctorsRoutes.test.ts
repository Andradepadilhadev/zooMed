import { DataSource } from "typeorm";
import app from "../../../app";
import request from "supertest";
import AppDataSource from "../../../data-source";
import {
  mockedDoctor,
  mockedDoctorLogin,
  mockedDoctorUpdate,
  mockedSpeciality,
} from "../../mocks";

describe("Doctors Routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /doctors - Must be able to create doctors", async () => {
    const response = await request(app).post("/doctors").send(mockedDoctor);

    expect(response.status).toBe(201);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("crmv");
    expect(response.body.email).toEqual(mockedDoctor.email);
    expect(response.body.isActive).toEqual(true);
  });

  test("POST /doctors - Must not be able to create existing doctors", async () => {
    const response = await request(app).post("/doctors").send(mockedDoctor);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /doctors - Must not be able to update user without token or invalid token", async () => {
    const responseNoToken = await request(app)
      .patch("/doctors")
      .send(mockedDoctorUpdate);
    const token = "";
    const responseInvalidToken = await request(app)
      .patch("/doctors")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedDoctorUpdate);

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");

    expect(responseInvalidToken.status).toBe(403);
    expect(responseInvalidToken.body).toHaveProperty("message");
  });

  test("PATCH /doctors - Must be able to update doctors", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: mockedDoctor.email, password: mockedDoctor.password });
    const response = await request(app)
      .patch(`/doctors`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedDoctorUpdate);

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("id");
    expect(response.body.crmv).toEqual(mockedDoctor.crmv);
    expect(response.body.email).toEqual(mockedDoctorUpdate.email);
    expect(response.body.birthDate).toEqual(mockedDoctor.birthDate);
  });

  test("GET /doctors - Must be able to list doctors", async () => {
    const response = await request(app).get("/doctors");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("doctorSpecialities");
    expect(response.body[0]).toHaveProperty("clinicsDoctors");
  });

  test("GET /doctors/profile - Must be able to list the logged doctors information", async () => {
    const login = await request(app).post("/login").send({
      email: mockedDoctorUpdate.email,
      password: mockedDoctor.password,
    });

    const response = await request(app)
      .get("/doctors/profile")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.email).toEqual(mockedDoctorUpdate.email);
    expect(response.body.name).toEqual(mockedDoctorUpdate.name);
    expect(response.body.crmv).toEqual(mockedDoctor.crmv);
  });

  test("PATCH /doctors - Must not be able to modify id or isActive", async () => {
    const login = await request(app).post("/login").send({
      email: mockedDoctorUpdate.email,
      password: mockedDoctor.password,
    });
    const response = await request(app)
      .patch("/doctors")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ id: "100", isActive: false });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /doctors/specialities - Must be able to create speciality and add to the doctors specialities", async () => {
    const login = await request(app).post("/login").send(mockedDoctorLogin);

    const responseCreateSpeciality = await request(app)
      .post("/doctors/specialities")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedSpeciality);

    expect(responseCreateSpeciality.status).toBe(201);
    expect(responseCreateSpeciality.body).toHaveProperty("message");
    expect(responseCreateSpeciality.body).toHaveProperty("speciality");
    expect(responseCreateSpeciality.body.speciality).toHaveProperty("id");

    const responseWasSpecialityAdded = await request(app).get("/doctors");

    expect(
      responseWasSpecialityAdded.body[0].doctorSpecialities[0].speciality.name
    ).toEqual(mockedSpeciality.name);
  });

  test("GET /doctors/specialitites - Must be able to list specialities", async () => {
    const response = await request(app).get("/doctors/specialities");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual(mockedSpeciality.name);
  });

  test("GET /doctors/specialities/:id - Must be able to list doctors by speciality", async () => {
    const specialitiesList = await request(app).get("/doctors/specialities");

    const response = await request(app).get(
      `/doctors/specialities/${specialitiesList.body[0].id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual(mockedDoctorUpdate.name);
  });

  test("PATCH /doctors/specialities - Must be able to remove speciality from the doctors specialities", async () => {
    const login = await request(app).post("/login").send(mockedDoctorLogin);

    const specialitiesList = await request(app).get("/doctors/specialities");

    const response = await request(app)
      .patch(`/doctors/specialities/${specialitiesList.body[0].id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");

    const doctorsList = await request(app).get("/doctors");

    expect(doctorsList.body[0].doctorSpecialities).toHaveLength(0);
  });

  test("PATCH /doctors - Must be able to do a soft delete of the doctors", async () => {
    const login = await request(app).post("/login").send(mockedDoctorLogin);

    const userInformation = await request(app)
      .get("/doctors/profile")
      .set("Authorization", `Bearer ${login.body.token}`);

    const response = await request(app)
      .patch(`/doctors/${userInformation.body.id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Doctor deleted successfully");
  });
});
