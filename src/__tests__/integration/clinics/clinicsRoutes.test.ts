import { DataSource } from "typeorm";
import app from "../../../app";
import request from "supertest";
import AppDataSource from "../../../data-source";
import {
  mockedClinic,
  mockedDoctorLogin,
  mockedUserLogin,
  mockedUserUpdated,
  mockedUser,
  mockedClinic2,
  mockedDoctor,
} from "../../mocks";

describe("Clinics Routes", () => {
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

  test("POST/clinics - Must be able to create a clinic", async () => {
    const login = await request(app).post("/login").send(mockedDoctorLogin);

    const response = await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedClinic);

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
    expect(response.status).toBe(201);
  });
  test("POST/clinics - Must not be able to create clinic without token or a invalid token", async () => {
    const invalidToken = "";

    const response = await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(mockedClinic);

    expect(response.body).toHaveProperty("message");

    expect(response.status).toBe(401);
  });

  test("POST/clinics - Must not be able to create a clinic being user", async () => {
    const login = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .post("/clinics")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedClinic);

    expect(response.body).toHaveProperty("message");

    expect(response.status).toBe(401);
  });

  test("GET /clinics -  Must be able to list users", async () => {
    await request(app).post("/clinics").send(mockedClinic2);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/clinics")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
  });

  test("PATCH/clinics/:id - Must be able update a clinic", async () => {
    const login = await request(app).post("/login").send(mockedDoctorLogin);
    const clinicTobeUpdate = await request(app)
      .get("/clinics")
      .set("Authorization", `Bearer ${login.body.token}`);

    const response = await request(app)
      .patch(`/clinics/${clinicTobeUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedUserUpdated);

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
    expect(response.status).toBe(200);
  });

  test("PATCH/clinics/:id - Must not be able to update clinic without token or a invalid token", async () => {
    const login = await request(app).post("/login").send(mockedDoctorLogin);
    const clinicTobeUpdate = await request(app)
      .get("/clinics")
      .set("Authorization", `Bearer ${login.body.token}`);

    const invalidToken = "";

    const response = await request(app)
      .patch(`/clinics${clinicTobeUpdate.body[0].id}`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .send(mockedClinic);

    expect(response.body).toHaveProperty("message");

    expect(response.status).toBe(401);
  });

  test("DELETE /clinics/:id -  should not be able to delete clinic without token or a invalid token", async () => {
    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const clinicTobeDeleted = await request(app)
      .get("/clinics")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);
    const invalidToken = "";

    const response = await request(app)
      .delete(`/users/${clinicTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id -  Must be able to soft delete user", async () => {
    await request(app).post("/doctors").send(mockedDoctor);

    const doctorLoginResponse = await request(app)
      .post("/login")
      .send(mockedDoctorLogin);
    const clinicTobeDeleted = await request(app)
      .get("/clinics")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${clinicTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);
    const findClinic = await request(app)
      .get("/clinics")
      .set("Authorization", `Bearer ${doctorLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findClinic.body[0].isActive).toBe(false);
  });
});
