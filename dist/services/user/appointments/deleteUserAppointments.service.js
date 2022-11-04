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
const appError_1 = require("../../../errors/appError");
const repositories_1 = require("../../../utilities/repositories");
const appointmentsDeleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findAppointments = yield repositories_1.appointmentsRepository.findOneBy({
        id,
    });
    if (!findAppointments) {
        throw new appError_1.AppError("Appointment not found", 400);
    }
    if (findAppointments.isCanceled) {
        throw new appError_1.AppError("Apointment already canceled", 400);
    }
    yield repositories_1.appointmentsRepository.update(id, {
        isCanceled: true,
    });
});
exports.default = appointmentsDeleteService;
