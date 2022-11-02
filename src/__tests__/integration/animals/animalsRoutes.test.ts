import {
  mockedAnimal,
  mockedType,
  mockedTypeUpdated,
} from "./../../mocks/index";
import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedUser } from "../../mocks";

describe("Animals Routes", () => {
  let connection: DataSource;
  let validToken: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
    const userLogin = await request(app)
      .post("/login")
      .send({ email: mockedUser.email, password: mockedUser.password });
    validToken = userLogin.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /animals/types - Must be able to create a type", async () => {
    const response = await request(app).post("/animals/types").send(mockedType);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual(mockedType.name);
  });

  test("POST /types - Must not be able to create existing type", async () => {
    const response = await request(app).post("/animals/types").send(mockedType);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /types - Must not be able to list all types without token or with invalid token", async () => {
    const responseNoToken = await request(app).get("/animals/types");
    const invalidToken = "";
    const responseInvalidToken = await request(app)
      .get("/animals/types")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(responseNoToken.status).toBe(403);
    expect(responseNoToken.body).toHaveProperty("message");

    expect(responseInvalidToken.status).toBe(403);
    expect(responseInvalidToken.body).toHaveProperty("message");
  });

  test("GET /types - Must be able to list all types", async () => {
    const response = await request(app)
      .get("/animals/types")
      .set("Authorization", `Bearer ${validToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("PATCH /animals/types/:id - Must be able to update a type", async () => {
    const types = await request(app)
      .get("/animals/types")
      .set("Authorization", `Bearer ${validToken}`);
    const typeToBeUpdated = types.body[0].id;
    const response = await request(app)
      .patch(`/animals/types/${typeToBeUpdated}`)
      .send(mockedTypeUpdated);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(typeToBeUpdated);
    expect(response.body.name).toEqual(mockedTypeUpdated.name);
  });

  test("POST /animals - Must be able to create an animal", async () => {
    const types = await request(app)
      .get("/animals/types")
      .set("Authorization", `Bearer ${validToken}`);
    const typeId = types.body[0].id;
    mockedAnimal.type = typeId;
    const response = await request(app)
      .post("/animals")
      .set("Authorization", `Bearer ${validToken}`)
      .send(mockedAnimal);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("isAlive");
    expect(response.body.isAlive).toEqual(true);
  });

  test("POST /animals - Must not be able to create an animals without token or with invalid token", async () => {});
  test("GET /users/animals - Must not be able to list all animals of the user without token or with invalid token", async () => {});
  test("GET /users/animals - Must be able to list all animals of the user", async () => {});
  test("PATCH /animlas/:id - Must not be able to delete animal without token or a invalid token", async () => {});
  test("PATCH /animlas/:id - Must be able to delete animal", async () => {});
});
