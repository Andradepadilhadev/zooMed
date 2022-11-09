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
const createUserReviewService = (review, appointmentsId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repositories_1.usersRepository.findOneBy({ id: userId });
    const appointment = yield repositories_1.appointmentsRepository.findOneBy({
        id: appointmentsId,
    });
    if (!appointment) {
        throw new appError_1.AppError("Appointment not found", 400);
    }
    if (appointment.isCanceled) {
        throw new appError_1.AppError("You can not review a canceled appointment", 403);
    }
    const today = new Date();
    const appointmentDate = new Date(appointment.date);
    if (appointmentDate > today) {
        throw new appError_1.AppError("Appointment hasn't happened yet", 403);
    }
    const reviewAlreadyExists = yield repositories_1.reviewsRepository.findOne({
        where: { appointments: appointment },
    });
    if (reviewAlreadyExists) {
        throw new appError_1.AppError("You Already reviewed this appointment", 403);
    }
    const newReview = repositories_1.reviewsRepository.create({
        review,
        appointments: appointment,
        user: user,
    });
    yield repositories_1.reviewsRepository.save(newReview);
    return newReview;
});
exports.default = createUserReviewService;
