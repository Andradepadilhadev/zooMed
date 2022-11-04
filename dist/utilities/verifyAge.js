"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAge = void 0;
const appError_1 = require("../errors/appError");
const verifyAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let calculateAge = today.getFullYear() - birth.getFullYear();
    const age = today.getMonth() - birth.getMonth();
    if (age < 18 || (age === 18 && today.getDate() < birth.getDate())) {
        calculateAge--;
    }
    if (calculateAge < 18) {
        throw new appError_1.AppError("Invalid age", 400);
    }
};
exports.verifyAge = verifyAge;
