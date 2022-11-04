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
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const appError_1 = require("../../errors/appError");
const repositories_1 = require("../../utilities/repositories");
const createDoctorService = ({ name, email, password, birthDate, crmv, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        throw new appError_1.AppError("Password is missing", 400);
    }
    const doctorAlreadyExists = yield repositories_1.doctorsRepository.findOneBy({ email });
    if (doctorAlreadyExists) {
        throw new appError_1.AppError("Email already exists", 409);
    }
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const newDoctor = repositories_1.doctorsRepository.create({
        name,
        email,
        password: hashedPassword,
        birthDate,
        crmv,
    });
    yield repositories_1.doctorsRepository.save(newDoctor);
    return newDoctor;
});
exports.default = createDoctorService;
