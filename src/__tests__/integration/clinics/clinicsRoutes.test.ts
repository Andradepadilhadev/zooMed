import { DataSource } from "typeorm";
import app from "../../../app";
import request from "supertest";
import AppDataSource from "../../../data-source";
import {
  mockedClinic,
  mockedUserLogin,
  mockedUser,
  mockedClinicTwo,
  mockedDoctor,
  mockedClinicUpdate,
} from "../../mocks";

describe("Clinics Routes", () => {
  let connection: DataSource;
  let validDoctorToken: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    //create Doctor
    await request(app).post("/doctors").send(mockedDoctor);

    //Doctor login
    const login = await request(app)
      .post("/login")
      .send({ email: mockedDoctor.email, password: mockedDoctor.password });
    validDoctorToken = login.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /clinics - Must be able to create a clinic", async () => {
    const response = await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedClinic);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty("crmv_pj");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("id");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("zipCode");
    expect(response.body.address).toHaveProperty("number");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("state");
  });

  test("POST /clinics - Must not be able to create clinic without token or a invalid token", async () => {
    const invalidToken = "";
    const responseInvalidToken = await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(mockedClinic);

    const responseNoToken = await request(app)
      .post("/clinics")
      .send(mockedClinic);

    expect(responseInvalidToken.status).toBe(403);
    expect(responseInvalidToken.body).toHaveProperty("message");
    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");
  });

  test("POST /clinics - Must not be able to create a clinic being user", async () => {
    await request(app).post("/users").send(mockedUser);
    const login = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedClinic);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /clinics -  Must be able to list clinics", async () => {
    await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedClinicTwo);

    const response = await request(app).get("/clinics");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test("PATCH /clinics/:id - Must be able update a clinic", async () => {
    const clinicToBeUpdate = await request(app).get("/clinics");

    const response = await request(app)
      .patch(`/clinics/${clinicToBeUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedClinicUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty("crmv_pj");
  });

  test("PATCH /clinics/:id - Must not be able to update clinic without token or a invalid token", async () => {
    const clinicToBeUpdate = await request(app)
      .get("/clinics")
      .set("Authorization", `Bearer ${validDoctorToken}`);

    const invalidToken = "";
    const responseInvalidToken = await request(app)
      .patch(`/clinics/${clinicToBeUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(mockedClinic);

    const responseNoToken = await request(app)
      .patch(`/clinics/${clinicToBeUpdate.body[0].id}`)
      .send(mockedClinic);

    expect(responseInvalidToken.status).toBe(403);
    expect(responseInvalidToken.body).toHaveProperty("message");
    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");
  });

  test("PATCH /clinics/:id - Must be able to remove clinic from the doctors clinics", async () => {
    const clinicsList = await request(app).get("/clinics");

    const response = await request(app)
      .patch("/clinics")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send({ id: clinicsList.body[0].id });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");

    const doctorsList = await request(app).get("/doctors");

    expect(doctorsList.body[0].clinicsDoctors).toHaveLength(1);
  });
});
