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
describe("Doctors Routes", () => {
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
    test("POST /doctors - Must be able to create doctors", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/doctors").send(mocks_1.mockedDoctor);
        expect(response.status).toBe(201);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).toHaveProperty("crmv");
        expect(response.body.email).toEqual(mocks_1.mockedDoctor.email);
        expect(response.body.isActive).toEqual(true);
    }));
    test("POST /doctors - Must not be able to create existing doctors", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/doctors").send(mocks_1.mockedDoctor);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /doctors - Must not be able to update user without token or invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseNoToken = yield (0, supertest_1.default)(app_1.default)
            .patch("/doctors")
            .send(mocks_1.mockedDoctorUpdate);
        const token = "";
        const responseInvalidToken = yield (0, supertest_1.default)(app_1.default)
            .patch("/doctors")
            .set("Authorization", `Bearer ${token}`)
            .send(mocks_1.mockedDoctorUpdate);
        expect(responseNoToken.status).toBe(401);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidToken.status).toBe(401);
        expect(responseInvalidToken.body).toHaveProperty("message");
    }));
    test("PATCH /doctors - Must be able to update doctors", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedDoctor.email, password: mocks_1.mockedDoctor.password });
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/doctors`)
            .set("Authorization", `Bearer ${login.body.token}`)
            .send(mocks_1.mockedDoctorUpdate);
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("id");
        expect(response.body.crmv).toEqual(mocks_1.mockedDoctor.crmv);
        expect(response.body.email).toEqual(mocks_1.mockedDoctorUpdate.email);
        expect(response.body.birthDate).toEqual(mocks_1.mockedDoctor.birthDate);
        expect(response.body.createdAt).not.toEqual(response.body.updatedAt);
    }));
    test("GET /doctors - Must be able to list doctors", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("specialities");
        expect(response.body[0]).toHaveProperty("clinics");
    }));
    test("PATCH /doctors - Must not be able to modify id or isActive", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send({
            email: mocks_1.mockedDoctorUpdate.email,
            password: mocks_1.mockedDoctor.password,
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch("/doctors")
            .set("Authorization", `Bearer ${login.body.token}`)
            .send({ id: "100", isActive: false });
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    }));
    test("POST /doctors/specialities - Must be able to create speciality and add to the doctors specialities", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedDoctorLogin);
        const responseCreateSpeciality = yield (0, supertest_1.default)(app_1.default)
            .post("/doctors/specialities")
            .set("Authorization", `Bearer ${login.body.token}`)
            .send(mocks_1.mockedSpeciality);
        expect(responseCreateSpeciality.status).toBe(201);
        expect(responseCreateSpeciality.body).toHaveProperty("id");
        const responseWasSpecialityAdded = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        expect(responseWasSpecialityAdded.body[0].specialities[0]).toEqual(mocks_1.mockedSpeciality.name);
    }));
    test("GET /doctors/specialitites - Must be able to list specialities", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/doctors/specialities");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toEqual(mocks_1.mockedSpeciality.name);
    }));
    test("GET /doctors/specialities/:id - Must be able to list doctors by speciality", () => __awaiter(void 0, void 0, void 0, function* () {
        const specialitiesList = yield (0, supertest_1.default)(app_1.default).get("/doctors/specialities");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/doctors/specialities/${specialitiesList.body[0].id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toEqual(mocks_1.mockedDoctorUpdate.name);
    }));
    test("PATCH /doctors/specialities - Must be able to remove speciality from the doctors specialities", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedDoctorLogin);
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch("/doctors/specilities")
            .set("Authorization", `Bearer ${login.body.token}`)
            .send(mocks_1.mockedSpeciality);
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual(mocks_1.mockedDoctorUpdate.name);
        expect(response.body.specialities).toHaveLength(0);
    }));
    test("PATCH /doctors - Must be able to do a soft delete of the doctors", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedDoctorLogin);
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch("/doctors")
            .set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toEqual("Doctor deleted/deactivated with success");
    }));
});
