import { DataSource } from "typeorm";
import app from "../../../app";
import request from "supertest";
import AppDataSource from "../../../data-source";
import { mockedUser, mockedUserUpdated } from "../../mocks";

describe("Users Routes", () => {
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

  test("POST /users - Must be able to create user", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(201);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.email).toEqual(mockedUser.email);
    expect(response.body.isActive).toEqual(true);
  });

  test("POST /users - Must not be able to create existing user", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users - Must not be able to update user without token or invalid token", async () => {
    const responseNoToken = await request(app)
      .patch("/users")
      .send(mockedUserUpdated);
    const token = "";
    const responseInvalidToken = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedUserUpdated);

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");

    expect(responseInvalidToken.status).toBe(401);
    expect(responseInvalidToken.body).toHaveProperty("message");
  });

  test("PATCH /users - Must be able to update user", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: mockedUser.email, password: mockedUser.password });
    const response = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedUserUpdated);

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toEqual(mockedUserUpdated.email);
    expect(response.body.birthDate).toEqual(mockedUserUpdated.birthDate);
    expect(response.body.createdAt).not.toEqual(response.body.updatedAt);
  });

  test("PATCH /users - Must not be able to modify id or isActive", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: mockedUserUpdated.email, password: mockedUser.password });
    const response = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({ id: "100", isActive: false });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users - Must be able to do a soft delete of the user", async () => {
    const login = await request(app)
      .post("/login")
      .send({ email: mockedUserUpdated.email, password: mockedUser.password });
    const response = await request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "User deleted/deactivated with success"
    );
  });
});
