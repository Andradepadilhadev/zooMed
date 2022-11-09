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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const data_source_1 = __importDefault(require("../../../data-source"));
const mocks_1 = require("../../mocks");
describe("Session Routes", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        yield (0, supertest_1.default)(app_1.default).post("/doctors").send(mocks_1.mockedDoctor);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /login - Must be able to login with user account", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedUser.email, password: mocks_1.mockedUser.password });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    }));
    test("POST /login - Must be able to login with doctor account", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedDoctor.email, password: mocks_1.mockedDoctor.password });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    }));
    test("POST /login - Must not be able to log into a user account with wrong password/email", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseWrongEmail = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: "user@email.com", password: mocks_1.mockedUser.password });
        const responseWrongPassword = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedDoctor.email, password: "abcd" });
        expect(responseWrongEmail.status).toBe(401);
        expect(responseWrongEmail.body).toHaveProperty("message");
        expect(responseWrongPassword.status).toBe(401);
        expect(responseWrongPassword.body).toHaveProperty("message");
    }));
    test("POST /login - Must not be able to log into a doctor account with wrong password/email", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseWrongEmail = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: "doctor@email.com", password: mocks_1.mockedDoctor.password });
        const responseWrongPassword = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedDoctor.email, password: "abcd" });
        expect(responseWrongEmail.status).toBe(401);
        expect(responseWrongEmail.body).toHaveProperty("message");
        expect(responseWrongPassword.status).toBe(401);
        expect(responseWrongPassword.body).toHaveProperty("message");
    }));
});
