import { DataSource } from "typeorm";
import app from "../../../app";
import request from "supertest";
import AppDataSource from "../../../data-source";
import { mockedDoctor, mockedDoctorUpdate } from "../../mocks";

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

  test("PATCH /doctors/:id - Must not be able to update user without token or invalid token", async () => {
    const responseNoToken = await request(app)
      .patch("/doctors")
      .send(mockedDoctorUpdate);
    const token = "";
    const responseInvalidToken = await request(app)
      .patch("/doctors")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedDoctorUpdate);

    expect(responseNoToken.status).toBe(409);
    expect(responseNoToken.body).toHaveProperty("message");

    expect(responseInvalidToken.status).toBe(409);
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
    expect(response.body.crmv).toEqual(mockedDoctorUpdate.crmv);
    expect(response.body.email).toEqual(mockedDoctorUpdate.email);
    expect(response.body.birthDate).toEqual(mockedDoctorUpdate.birthDate);
    expect(response.body.createdAt).not.toEqual(response.body.updatedAt);
  });

  test("DELETE /doctors - Must not be able to modify id or isActive", async () => {
    const login = await request(app).post("/login").send({
      email: mockedDoctorUpdate.email,
      password: mockedDoctorUpdate.password,
    });
    const response = await request(app)
      .patch("/doctors")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ id: "100", isActive: false });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /doctors - Must be able to do a soft delete of the doctors", async () => {
    const login = await request(app).post("/login").send({
      email: mockedDoctorUpdate.email,
      password: mockedDoctorUpdate.password,
    });
    const response = await request(app)
      .patch("/doctors")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "Doctor deleted/deactivated with success"
    );
  });

  test("PATCH/doctors - ");

  test("DELETE/specialties/:id - Must be able to do a soft delete of the specialties", async () => {
    const login = await request(app).post("/login").send({
      email: mockedDoctorUpdate.email,
      password: mockedDoctorUpdate.password,
    });
    const response = await request(app)
      .patch("/doctors/specialties")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "Speciality deleted/deactivated with success"
    );
  });

  test("DELETE/specialties/:id should not be able to delete speciality without authentication", async () => {
    const response = await request(app).post("/login").send({
      email: mockedDoctorUpdate.email,
      password: mockedDoctorUpdate.password,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
