"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../mocks/index");
const index_2 = require("../../mocks/index");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const data_source_1 = __importDefault(require("../../../data-source"));
describe("Animals Routes", () => {
    let connection;
    let validDoctorToken;
    let validUserToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post("/users").send(index_2.mockedUser);
        const userLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: index_2.mockedUser.email, password: index_2.mockedUser.password });
        validUserToken = userLogin.body.token;
        yield (0, supertest_1.default)(app_1.default).post("/doctors").send(index_1.mockedDoctor);
        const doctorLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: index_1.mockedDoctor.email, password: index_1.mockedDoctor.password });
        validDoctorToken = doctorLogin.body.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /animals/species - Must be not able to create a species with a user login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/animals/species")
            .set("Authorization", `Bearer ${validUserToken}`)
            .send(index_2.mockedSpecies);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
    test("POST /animals/species - Must be able to create a species with a doctor login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/animals/species")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(index_2.mockedSpecies);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toEqual(index_2.mockedSpecies.name);
    }));
    test("POST /animals/species - Must not be able to create existing species", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/animals/species")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(index_2.mockedSpecies);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /animals/species - Must not be able to list all species without token or with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseNoToken = yield (0, supertest_1.default)(app_1.default).get("/animals/species");
        const invalidUserToken = "";
        const responseInvalidUserToken = yield (0, supertest_1.default)(app_1.default)
            .get("/animals/species")
            .set("Authorization", `Bearer ${invalidUserToken}`);
        expect(responseNoToken.status).toBe(403);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidUserToken.status).toBe(403);
        expect(responseInvalidUserToken.body).toHaveProperty("message");
    }));
    test("GET /animals/species - Must be able to list all species with user or doctor login", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseUser = yield (0, supertest_1.default)(app_1.default)
            .get("/animals/species")
            .set("Authorization", `Bearer ${validUserToken}`);
        const responseDoctor = yield (0, supertest_1.default)(app_1.default)
            .get("/animals/species")
            .set("Authorization", `Bearer ${validDoctorToken}`);
        expect(responseUser.status).toBe(200);
        expect(responseUser.body).toHaveLength(1);
        expect(responseDoctor.status).toBe(200);
        expect(responseDoctor.body).toHaveLength(1);
    }));
    test("PATCH /animals/species/:id - Must be able to update a species", () => __awaiter(void 0, void 0, void 0, function* () {
        const species = yield (0, supertest_1.default)(app_1.default)
            .get("/animals/species")
            .set("Authorization", `Bearer ${validDoctorToken}`);
        const speciesToBeUpdated = species.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/animals/species/${speciesToBeUpdated}`)
            .send(index_2.mockedSpeciesUpdated);
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(speciesToBeUpdated);
        expect(response.body.name).toEqual(index_2.mockedSpeciesUpdated.name);
    }));
    test("POST /animals - Must not be able to create an animals without token or with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const species = yield (0, supertest_1.default)(app_1.default)
            .get("/animals/species")
            .set("Authorization", `Bearer ${validUserToken}`);
        const speciesId = species.body[0].id;
        index_2.mockedAnimal.species = speciesId;
        const invalidUserToken = "";
        const responseInvalidUserToken = yield (0, supertest_1.default)(app_1.default)
            .post("/animals")
            .set("Authorization", `Bearer ${invalidUserToken}`)
            .send(index_2.mockedAnimal);
        const responseNoToken = yield (0, supertest_1.default)(app_1.default)
            .post("/animals")
            .send(index_2.mockedAnimal);
        expect(responseNoToken.status).toBe(403);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidUserToken.status).toBe(403);
        expect(responseInvalidUserToken.body).toHaveProperty("message");
    }));
    test("POST /animals - Must be able to create an animal", () => __awaiter(void 0, void 0, void 0, function* () {
        const species = yield (0, supertest_1.default)(app_1.default)
            .get("/animals/species")
            .set("Authorization", `Bearer ${validUserToken}`);
        const speciesId = species.body[0].id;
        index_2.mockedAnimal.species = speciesId;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/animals")
            .set("Authorization", `Bearer ${validUserToken}`)
            .send(index_2.mockedAnimal);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("isAlive");
        expect(response.body.isAlive).toEqual(true);
    }));
    test("POST /animals - Must not be able to create the same animal", () => __awaiter(void 0, void 0, void 0, function* () {
        const species = yield (0, supertest_1.default)(app_1.default)
            .get("/animals/species")
            .set("Authorization", `Bearer ${validUserToken}`);
        const speciesId = species.body[0].id;
        index_2.mockedAnimal.species = speciesId;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/animals")
            .set("Authorization", `Bearer ${validUserToken}`)
            .send(index_2.mockedAnimal);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /users/animals - Must not be able to list all animals of the user without token or with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUserToken = "";
        const responseInvalidUserToken = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${invalidUserToken}`);
        const responseNoToken = yield (0, supertest_1.default)(app_1.default).get("/users/animals");
        expect(responseNoToken.status).toBe(403);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidUserToken.status).toBe(403);
        expect(responseInvalidUserToken.body).toHaveProperty("message");
    }));
    test("GET /users/animals - Must be able to list all animals of the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toEqual(index_2.mockedAnimal.name);
        expect(response.body[0]).toHaveProperty("type");
    }));
    test("PATCH /animals/:id - Must not be able to delete animal without token or a invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const animalsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        const animalToBeDeleted = animalsList.body[0].id;
        const invalidUserToken = "";
        const responseInvalidUserToken = yield (0, supertest_1.default)(app_1.default)
            .patch(`/animals/${animalToBeDeleted}`)
            .set("Authorization", `Bearer ${invalidUserToken}`);
        const responseNoToken = yield (0, supertest_1.default)(app_1.default).patch(`/animals/${animalToBeDeleted}`);
        expect(responseNoToken.status).toBe(403);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidUserToken.status).toBe(403);
        expect(responseInvalidUserToken.body).toHaveProperty("message");
    }));
    test("PATCH /animals/:id - Must not be able to delete animal with invalid or non-existing id", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseNonExistingId = yield (0, supertest_1.default)(app_1.default)
            .patch(`/animals/${index_2.mockedWrongId}`)
            .set("Authorization", `Bearer ${validUserToken}`);
        const responseInvalidId = yield (0, supertest_1.default)(app_1.default)
            .patch("/animals/322")
            .set("Authorization", `Bearer ${validUserToken}`);
        expect(responseNonExistingId.status).toBe(404);
        expect(responseNonExistingId.body).toHaveProperty("message");
        expect(responseInvalidId.status).toBe(400);
        expect(responseInvalidId.body).toHaveProperty("message");
    }));
    test("PATCH /animals/:id - Must be able to delete animal", () => __awaiter(void 0, void 0, void 0, function* () {
        const animalsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        const animalToBeDeleted = animalsList.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/animals/${animalToBeDeleted}`)
            .set("Authorization", `Bearer ${validUserToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
});
