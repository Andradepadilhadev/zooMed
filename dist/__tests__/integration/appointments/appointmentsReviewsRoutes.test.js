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
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const mocks_1 = require("../../mocks");
describe("Appointmenst and Reviews Routes", () => {
    let connection;
    let validUserToken;
    let validDoctorToken;
    const invalidToken = "";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        //create a user and login
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        const userLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedUser.email, password: mocks_1.mockedUser.password });
        validUserToken = userLogin.body.token;
        // create a doctor and login
        yield (0, supertest_1.default)(app_1.default).post("/doctors").send(mocks_1.mockedDoctor);
        const doctorLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: mocks_1.mockedDoctor.email, password: mocks_1.mockedDoctor.password });
        validDoctorToken = doctorLogin.body.token;
        //create a apeciality
        yield (0, supertest_1.default)(app_1.default)
            .post("/doctors/specialities")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(mocks_1.mockedSpeciality);
        //create a species
        yield (0, supertest_1.default)(app_1.default)
            .post("/animals/species")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(mocks_1.mockedSpecies);
        //get the species id
        const species = yield (0, supertest_1.default)(app_1.default)
            .get("/animals/species")
            .set("Authorization", `Bearer ${validDoctorToken}`);
        const speciesId = species.body[0].id;
        //create an animal
        mocks_1.mockedAnimal.species = speciesId;
        yield (0, supertest_1.default)(app_1.default)
            .post("/animals")
            .set("Authorization", `Bearer ${validUserToken}`)
            .send(mocks_1.mockedAnimal);
        //create a clinic
        yield (0, supertest_1.default)(app_1.default)
            .post("/clinics")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(mocks_1.mockedClinic);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /users/appointments - Must not be able to create appointment without token or with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const animalsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        const animalId = animalsList.body[0].id;
        const doctorsList = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        const clinicsDoctorsId = doctorsList.body[0].clinicsDoctors[0].id;
        mocks_1.mockedAppointment.animalsId = animalId;
        mocks_1.mockedAppointment.clinicsDoctorsId = clinicsDoctorsId;
        const responseNoToken = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment);
        const responseInvalidToken = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${invalidToken}`);
        expect(responseNoToken.status).toBe(401);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidToken.status).toBe(401);
        expect(responseInvalidToken.body).toHaveProperty("message");
    }));
    test("POST /users/appointments - Must not be able to create appointment without animal id or incorrect animal id", () => __awaiter(void 0, void 0, void 0, function* () {
        const doctorsList = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        const clinicsDoctorsId = doctorsList.body[0].clinicsDoctors[0].id;
        mocks_1.mockedAppointment.clinicsDoctorsId = clinicsDoctorsId;
        const responseNoId = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        mocks_1.mockedAppointment.animalsId = "10";
        const responseInvalidId = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        expect(responseNoId.status).toBe(400);
        expect(responseNoId.body).toHaveProperty("message");
        expect(responseInvalidId.status).toBe(400);
        expect(responseInvalidId.body).toHaveProperty("message");
    }));
    test("POST /users/appointments - Must not be able to create appointment without clinicsDoctors id or incorrect clinicsDoctors id", () => __awaiter(void 0, void 0, void 0, function* () {
        const animalsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        mocks_1.mockedAppointment.animalsId = animalsList.body[0].id;
        const responseNoId = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        mocks_1.mockedAppointment.clinicsDoctorsId = "10";
        const responseInvalidId = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        expect(responseNoId.status).toBe(400);
        expect(responseNoId.body).toHaveProperty("message");
        expect(responseInvalidId.status).toBe(400);
        expect(responseInvalidId.body).toHaveProperty("message");
    }));
    test("POST /users/appointments - Must not be able to create a appointment with invalid date or hour", () => __awaiter(void 0, void 0, void 0, function* () {
        const animalsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        mocks_1.mockedAppointment.animalsId = animalsList.body[0].id;
        const doctorsList = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        mocks_1.mockedAppointment.clinicsDoctorsId =
            doctorsList.body[0].clinicsDoctors[0].id;
        mocks_1.mockedAppointment.date = "20/03/2020";
        const responseInvalidDate = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        mocks_1.mockedAppointment.date = "2020/03/20";
        mocks_1.mockedAppointment.hour = "10h";
        const responseInvalidHour = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        expect(responseInvalidDate.status).toBe(400);
        expect(responseInvalidDate.body).toHaveProperty("message");
        expect(responseInvalidHour.status).toBe(400);
        expect(responseInvalidHour.body).toHaveProperty("message");
    }));
    test("POST /users/appointments - Must be able to create appointment", () => __awaiter(void 0, void 0, void 0, function* () {
        const animalsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        mocks_1.mockedAppointment.animalsId = animalsList.body[0].id;
        const doctorsList = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        mocks_1.mockedAppointment.clinicsDoctorsId =
            doctorsList.body[0].clinicsDoctors[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }));
    test("POST /users/appointments - Must not be able to create a appointment with existing date, hour and doctor", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post("/clinics")
            .set("Authorization", `Bearer ${validDoctorToken}`)
            .send(mocks_1.mockedClinicTwo);
        const animalsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        mocks_1.mockedAppointment.animalsId = animalsList.body[0].id;
        const doctorsList = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        mocks_1.mockedAppointment.clinicsDoctorsId =
            doctorsList.body[0].clinicsDoctors[1].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /users/appointments - Must not me able to list appointments without token or with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseNoToken = yield (0, supertest_1.default)(app_1.default).get("/users/appointments");
        const responseInvalidToken = yield (0, supertest_1.default)(app_1.default)
            .get("/users/appointments")
            .set("Authorization", `Bearer${invalidToken}`);
        expect(responseNoToken.status).toBe(401);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidToken.status).toBe(401);
        expect(responseInvalidToken.body).toHaveProperty("message");
    }));
    test("GET /users/appointments - Must be able to list the users appointments", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/users/appointments")
            .set("Authorization", `Bearer${validUserToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    }));
    test("GET /doctors/appointments - Must be able to list the doctors appointments", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/doctors/appointments")
            .set("Authorization", `Bearer${validDoctorToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    }));
    test("POST /users/reviews - Must not be able to create review of an appointment that didn't happen yet", () => __awaiter(void 0, void 0, void 0, function* () {
        const animalsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/animals")
            .set("Authorization", `Bearer ${validUserToken}`);
        mocks_1.mockedAppointment.animalsId = animalsList.body[0].id;
        const doctorsList = yield (0, supertest_1.default)(app_1.default).get("/doctors");
        mocks_1.mockedAppointment.clinicsDoctorsId =
            doctorsList.body[0].clinicsDoctors[0].id;
        mocks_1.mockedAppointment.date = "2024/11/02";
        yield (0, supertest_1.default)(app_1.default)
            .post("/users/appointments")
            .send(mocks_1.mockedAppointment)
            .set("Authorization", `Bearer${validUserToken}`);
        const appointmentsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/appointments")
            .set("Authorization", `Bearer${validUserToken}`);
        mocks_1.mockedReview.appointmentId = appointmentsList.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users/reviews")
            .set("Authorization", `Bearer ${validUserToken}`)
            .send(mocks_1.mockedReview);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
    }));
    test("POST /users/reviews - Must be able to create an appointment review", () => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/appointments")
            .set("Authorization", `Bearer${validUserToken}`);
        mocks_1.mockedReview.appointmentId = appointmentsList.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users/reviews")
            .set("Authorization", `Bearer ${validUserToken}`)
            .send(mocks_1.mockedReview);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }));
    test("POST /users/reviews - Must not be ale to create a existing appointment review", () => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/appointments")
            .set("Authorization", `Bearer${validUserToken}`);
        mocks_1.mockedReview.appointmentId = appointmentsList.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/users/reviews")
            .set("Authorization", `Bearer ${validUserToken}`)
            .send(mocks_1.mockedReview);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /reviews - Must be able to list all reviews", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/reviews");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    }));
    test("GET /doctors/reviews - Must be able to get all reviews from logged doctor", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/doctors/reviews")
            .set("Authorization", `Bearer ${validDoctorToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    }));
    test("PATCH /users/reviews/:id - Must be able to update the review", () => __awaiter(void 0, void 0, void 0, function* () {
        const reviewsList = yield (0, supertest_1.default)(app_1.default).get("/reviews");
        const reviewId = reviewsList.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/reviews/${reviewId}`)
            .set("Authorization", `Bearer ${validUserToken}`)
            .send({ review: "Consulta devidamente avaliada." });
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(reviewId);
        expect(response.body.review).toEqual("Consulta devidamente avaliada.");
        expect(response.body.createdAt).not.toEqual(response.body.updatedAt);
    }));
    test("PATCH /users/reviews/:id - Must not be able to update review id", () => __awaiter(void 0, void 0, void 0, function* () {
        const reviewsList = yield (0, supertest_1.default)(app_1.default).get("/reviews");
        const reviewId = reviewsList.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/reviews/${reviewId}`)
            .set("Authorization", `Bearer ${validUserToken}`)
            .send({ id: "100" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /users/appointments/:id - Must not be able to cancel appointment without token or with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/appointments")
            .set("Authorization", `Bearer${validUserToken}`);
        const appointmentId = appointmentsList.body[0].id;
        const responseNoToken = yield (0, supertest_1.default)(app_1.default).patch(`/users/appointments/${appointmentId}`);
        const responseInvalidToken = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/appointments/${appointmentId}`)
            .set("Authorization", `Bearer ${invalidToken}`);
        expect(responseNoToken.status).toBe(401);
        expect(responseNoToken.body).toHaveProperty("message");
        expect(responseInvalidToken.status).toBe(401);
        expect(responseInvalidToken.body).toHaveProperty("message");
    }));
    test("PATCH /users/appointments/:id - Must be able to cancel the appointment with user login", () => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentsList = yield (0, supertest_1.default)(app_1.default)
            .get("/users/appointments")
            .set("Authorization", `Bearer${validUserToken}`);
        const appointmentId = appointmentsList.body[0].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/appointments/${appointmentId}`)
            .set("Authorization", `Bearer ${validUserToken}`);
        expect(response.status).toBe(200);
        expect(response.body.isCanceled).toBe(true);
    }));
    test("PATCH /doctors/appointments/:id - Must be able to cancel the appointment with doctor login", () => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentsList = yield (0, supertest_1.default)(app_1.default)
            .get("/doctors/appointments")
            .set("Authorization", `Bearer${validDoctorToken}`);
        const appointmentId = appointmentsList.body[1].id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/doctors/appointments/${appointmentId}`)
            .set("Authorization", `Bearer ${validDoctorToken}`);
        expect(response.status).toBe(200);
        expect(response.body.isCanceled).toBe(true);
    }));
});
