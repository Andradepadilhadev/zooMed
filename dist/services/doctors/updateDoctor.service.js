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
const repositories_1 = require("../../utilities/repositories");
const updateDoctorService = (id, { name, email, password, birthDate }) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield repositories_1.doctorsRepository.findOneBy({
        id,
    });
    yield repositories_1.doctorsRepository.update(id, {
        name: name ? name : doctor.name,
        email: email ? email : doctor.email,
        birthDate: birthDate ? birthDate : doctor.birthDate,
        password: password ? yield (0, bcryptjs_1.hash)(password, 10) : doctor.password,
    });
    const doctorUpdated = yield repositories_1.doctorsRepository.findOneBy({
        id,
    });
    return doctorUpdated;
});
exports.default = updateDoctorService;
