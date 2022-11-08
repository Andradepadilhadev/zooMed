import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedUser, mockedDoctor } from "../../mocks";

describe("Session Routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
    await request(app).post("/doctors").send(mockedDoctor);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Must be able to login with user account", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: mockedUser.email, password: mockedUser.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - Must be able to login with doctor account", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: mockedDoctor.email, password: mockedDoctor.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - Must not be able to log into a user account with wrong password/email", async () => {
    const responseWrongEmail = await request(app)
      .post("/login")
      .send({ email: "user@email.com", password: mockedUser.password });
    const responseWrongPassword = await request(app)
      .post("/login")
      .send({ email: mockedDoctor.email, password: "abcd" });

    expect(responseWrongEmail.status).toBe(401);
    expect(responseWrongEmail.body).toHaveProperty("message");
    expect(responseWrongPassword.status).toBe(401);
    expect(responseWrongPassword.body).toHaveProperty("message");
  });

  test("POST /login - Must not be able to log into a doctor account with wrong password/email", async () => {
    const responseWrongEmail = await request(app)
      .post("/login")
      .send({ email: "doctor@email.com", password: mockedDoctor.password });
    const responseWrongPassword = await request(app)
      .post("/login")
      .send({ email: mockedDoctor.email, password: "abcd" });

    expect(responseWrongEmail.status).toBe(401);
    expect(responseWrongEmail.body).toHaveProperty("message");
    expect(responseWrongPassword.status).toBe(401);
    expect(responseWrongPassword.body).toHaveProperty("message");
  });
});
