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
exports.verifyOwnerClinic = void 0;
const repositories_1 = require("./repositories");
const appError_1 = require("../errors/appError");
const verifyOwnerClinic = ({ clinics_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield repositories_1.clinicsDoctorsRepository.findOne({
        where: {
            id: clinics_id,
        },
        relations: {
            clinic: true,
        },
    });
    if (!doctor) {
        throw new appError_1.AppError("Unauthorized", 401);
    }
});
exports.verifyOwnerClinic = verifyOwnerClinic;
