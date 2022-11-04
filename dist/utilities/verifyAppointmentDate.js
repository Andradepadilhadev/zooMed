"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAppointmentDate = void 0;
const appError_1 = require("../errors/appError");
const verifyAppointmentDate = (date, hour) => {
    const validatedHour = Number(hour.split(":")[0]);
    if (validatedHour < 7 || validatedHour >= 18) {
        throw new appError_1.AppError("Invalid hour. Office hours are from 7h to 18h", 400);
    }
    const dateArray = date.split("/");
    const validatedDate = new Date(dateArray.join("-"));
    if (validatedDate.getDay() === 0) {
        throw new appError_1.AppError("Invalid date. Office days are from Monday to Saturday", 400);
    }
};
exports.verifyAppointmentDate = verifyAppointmentDate;
