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
describe("Clinics Routes", () => {
    let connection;
    let validDoctorToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        //create Doctor
        yield (0, supertest_1.default)(app_1.default).post("/doctors").send(mocks_1.mockedDoctor);
        //Doctor login
        const login = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedDoctor.email, password: mocks_1.mockedDoctor.password });
        validDoctorToken = login.body.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /clinics - Must be able to create a clinic", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/clinics")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(mocks_1.mockedClinic);
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
    }));
    test("POST /clinics - Must not be able to create clinic without token or a invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidToken = "";
        const responseInvalidToken = yield (0, supertest_1.default)(app_1.default)
            .post("/clinics")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(mocks_1.mockedClinic);
        const responseNoToken = yield (0, supertest_1.default)(app_1.default)
            .post("/clinics")
            .send(mocks_1.mockedClinic);
        expect(responseInvalidToken.status).toBe(403);
        expect(responseInvalidToken.body).toHaveProperty("message");
        expect(responseNoToken.status).toBe(401);
        expect(responseNoToken.body).toHaveProperty("message");
    }));
    test("POST /clinics - Must not be able to create a clinic being user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/clinics")
            .set("Authorization", `Bearer ${login.body.token}`)
            .send(mocks_1.mockedClinic);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /clinics -  Must be able to list clinics", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/clinics")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(mocks_1.mockedClinicTwo);
        const response = yield (0, supertest_1.default)(app_1.default).get("/clinics");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    }));
    test("PATCH /clinics/:id - Must be able update a clinic", () => __awaiter(void 0, void 0, void 0, function* () {
        const clinicToBeUpdate = yield (0, supertest_1.default)(app_1.default).get("/clinics");
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/clinics/${clinicToBeUpdate.body[0].id}`)
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(mocks_1.mockedClinicUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("contact");
        expect(response.body).toHaveProperty("crmv_pj");
    }));
    test("PATCH /clinics/:id - Must not be able to update clinic without token or a invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const clinicToBeUpdate = yield (0, supertest_1.default)(app_1.default)
            .get("/clinics")
            .set("Authorization", `Bearer ${validDoctorToken}`);
        const invalidToken = "";
        const responseInvalidToken = yield (0, supertest_1.default)(app_1.default)
            .patch(`/clinics/${clinicToBeUpdate.body[0].id}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(mocks_1.mockedClinic);
        const responseNoToken = yield (0, supertest_1.default)(app_1.default)
            .patch(`/clinics/${clinicToBeUpdate.body[0].id}`)
            .send(mocks_1.mockedClinic);
        expect(responseInvalidToken.status).toBe(403);
        expect(responseInvalidToken.body).toHaveProperty("message");
        expect(responseNoToken.status).toBe(401);
        expect(responseNoToken.body).toHaveProperty("message");
    }));
    test("PATCH /clinics/:id - Must be able to remove clinic from the doctors clinics", () => __awaiter(void 0, void 0, void 0, function* () {
        const clinicsList = yield (0, supertest_1.default)(app_1.default).get("/clinics");
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch("/clinics")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send({ id: clinicsList.body[0].id });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        const doctorsList = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        expect(doctorsList.body[0].clinicsDoctors).toHaveLength(1);
    }));
});
