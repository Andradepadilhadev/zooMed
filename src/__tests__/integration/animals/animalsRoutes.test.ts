import { mockedDoctor } from "./../../mocks/index";
import {
  mockedAnimal,
  mockedSpecies,
  mockedSpeciesUpdated,
  mockedWrongId,
  mockedUser,
} from "../../mocks/index";
import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";

describe("Animals Routes", () => {
  let connection: DataSource;
  let validDoctorToken: string;
  let validUserToken: string;

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
    validUserToken = userLogin.body.token;

    await request(app).post("/doctors").send(mockedDoctor);
    const doctorLogin = await request(app)
      .post("/login")
      .send({ email: mockedDoctor.email, password: mockedDoctor.password });
    validDoctorToken = doctorLogin.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /animals/species - Must be not able to create a species with a user login", async () => {
    const response = await request(app)
      .post("/animals/species")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(mockedSpecies);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /animals/species - Must be able to create a species with a doctor login", async () => {
    const response = await request(app)
      .post("/animals/species")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedSpecies);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual(mockedSpecies.name);
  });

  test("POST /animals/species - Must not be able to create existing species", async () => {
    const response = await request(app)
      .post("/animals/species")
      .set("Authorization", `Bearer ${validDoctorToken}`)
      .send(mockedSpecies);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /animals/species - Must not be able to list all species without token or with invalid token", async () => {
    const responseNoToken = await request(app).get("/animals/species");
    const invalidUserToken = "";
    const responseInvalidUserToken = await request(app)
      .get("/animals/species")
      .set("Authorization", `Bearer ${invalidUserToken}`);

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");

    expect(responseInvalidUserToken.status).toBe(401);
    expect(responseInvalidUserToken.body).toHaveProperty("message");
  });

  test("GET /animals/species - Must be able to list all species with user or doctor login", async () => {
    const responseUser = await request(app)
      .get("/animals/species")
      .set("Authorization", `Bearer ${validUserToken}`);
    const responseDoctor = await request(app)
      .get("/animals/species")
      .set("Authorization", `Bearer ${validDoctorToken}`);

    expect(responseUser.status).toBe(200);
    expect(responseUser.body).toHaveLength(1);
    expect(responseDoctor.status).toBe(200);
    expect(responseDoctor.body).toHaveLength(1);
  });

  test("PATCH /animals/species/:id - Must be able to update a species", async () => {
    const species = await request(app)
      .get("/animals/species")
      .set("Authorization", `Bearer ${validDoctorToken}`);
    const speciesToBeUpdated = species.body[0].id;
    const response = await request(app)
      .patch(`/animals/species/${speciesToBeUpdated}`)
      .send(mockedSpeciesUpdated);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(speciesToBeUpdated);
    expect(response.body.name).toEqual(mockedSpeciesUpdated.name);
  });

  test("POST /animals - Must not be able to create an animals without token or with invalid token", async () => {
    const species = await request(app)
      .get("/animals/species")
      .set("Authorization", `Bearer ${validUserToken}`);
    const speciesId = species.body[0].id;
    mockedAnimal.species = speciesId;

    const invalidUserToken = "";
    const responseInvalidUserToken = await request(app)
      .post("/animals")
      .set("Authorization", `Bearer ${invalidUserToken}`)
      .send(mockedAnimal);
    const responseNoToken = await request(app)
      .post("/animals")
      .send(mockedAnimal);

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");
    expect(responseInvalidUserToken.status).toBe(401);
    expect(responseInvalidUserToken.body).toHaveProperty("message");
  });

  test("POST /animals - Must be able to create an animal", async () => {
    const species = await request(app)
      .get("/animals/species")
      .set("Authorization", `Bearer ${validUserToken}`);
    const speciesId = species.body[0].id;
    mockedAnimal.species = speciesId;
    const response = await request(app)
      .post("/animals")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(mockedAnimal);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("isAlive");
    expect(response.body.isAlive).toEqual(true);
  });

  test("POST /animals - Must not be able to create the same animal", async () => {
    const species = await request(app)
      .get("/animals/species")
      .set("Authorization", `Bearer ${validUserToken}`);
    const speciesId = species.body[0].id;
    mockedAnimal.species = speciesId;
    const response = await request(app)
      .post("/animals")
      .set("Authorization", `Bearer ${validUserToken}`)
      .send(mockedAnimal);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users/animals - Must not be able to list all animals of the user without token or with invalid token", async () => {
    const invalidUserToken = "";
    const responseInvalidUserToken = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${invalidUserToken}`);
    const responseNoToken = await request(app).get("/users/animals");

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");
    expect(responseInvalidUserToken.status).toBe(401);
    expect(responseInvalidUserToken.body).toHaveProperty("message");
  });

  test("GET /users/animals - Must be able to list all animals of the user", async () => {
    const response = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toEqual(mockedAnimal.name);
    expect(response.body[0]).toHaveProperty("type");
  });

  test("PATCH /animals/:id - Must not be able to delete animal without token or a invalid token", async () => {
    const animalsList = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);
    const animalToBeDeleted = animalsList.body[0].id;

    const invalidUserToken = "";
    const responseInvalidUserToken = await request(app)
      .patch(`/animals/${animalToBeDeleted}`)
      .set("Authorization", `Bearer ${invalidUserToken}`);
    const responseNoToken = await request(app).patch(
      `/animals/${animalToBeDeleted}`
    );

    expect(responseNoToken.status).toBe(401);
    expect(responseNoToken.body).toHaveProperty("message");
    expect(responseInvalidUserToken.status).toBe(401);
    expect(responseInvalidUserToken.body).toHaveProperty("message");
  });

  test("PATCH /animals/:id - Must not be able to delete animal with invalid or non-existing id", async () => {
    const responseNonExistingId = await request(app)
      .patch(`/animals/${mockedWrongId}`)
      .set("Authorization", `Bearer ${validUserToken}`);
    const responseInvalidId = await request(app)
      .patch("/animals/322")
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(responseNonExistingId.status).toBe(404);
    expect(responseNonExistingId.body).toHaveProperty("message");
    expect(responseInvalidId.status).toBe(400);
    expect(responseInvalidId.body).toHaveProperty("message");
  });

  test("PATCH /animals/:id - Must be able to delete animal", async () => {
    const animalsList = await request(app)
      .get("/users/animals")
      .set("Authorization", `Bearer ${validUserToken}`);
    const animalToBeDeleted = animalsList.body[0].id;

    const response = await request(app)
      .patch(`/animals/${animalToBeDeleted}`)
      .set("Authorization", `Bearer ${validUserToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
