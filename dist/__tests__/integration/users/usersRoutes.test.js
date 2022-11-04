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
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = __importDefault(require("../../../data-source"));
const mocks_1 = require("../../mocks");
describe("Users Routes", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /users - Must be able to create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        expect(response.status).toBe(201);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.email).toEqual(mocks_1.mockedUser.email);
        expect(response.body.isActive).toEqual(true);
    }));
    test("POST /users - Must not be able to create existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /users - Must not be able to update user without token or invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseNoToken = yield (0, supertest_1.default)(app_1.default)
            .patch("/users")
            .send(mocks_1.mockedUserUpdated);
        const token = "";
        const responseInvalidToken = yield (0, supertest_1.default)(app_1.default)
            .patch("/users")
            .set("Authorization", `Bearer ${token}`)
            .send(mocks_1.mockedUserUpdated);
        expect(responseNoToken.status).toBe(409);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidToken.status).toBe(409);
        expect(responseInvalidToken.body).toHaveProperty("message");
    }));
    test("PATCH /users - Must be able to update user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedUser.email, password: mocks_1.mockedUser.password });
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch("/users")
            .set("Authorization", `Bearer ${login.body.token}`)
            .send(mocks_1.mockedUserUpdated);
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("id");
        expect(response.body.email).toEqual(mocks_1.mockedUserUpdated.email);
        expect(response.body.birthDate).toEqual(mocks_1.mockedUserUpdated.birthDate);
        expect(response.body.createdAt).not.toEqual(response.body.updatedAt);
    }));
    test("PATCH /users - Must not be able to modify id or isActive", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedUserUpdated.email, password: mocks_1.mockedUser.password });
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch("/users")
            .set("Authorization", `Bearer ${login.body.token}`)
            .send({ id: "100", isActive: false });
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /users - Must be able to do a soft delete of the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedUserUpdated.email, password: mocks_1.mockedUser.password });
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch("/users")
            .set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("User deleted/deactivated with success");
    }));
});
