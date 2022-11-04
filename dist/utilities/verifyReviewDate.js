"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyReviewDate = void 0;
const appError_1 = require("../errors/appError");
const verifyReviewDate = (date) => {
    const today = new Date();
    const scheduling = new Date(date);
    if (today.getDate() < scheduling.getDate()) {
        throw new appError_1.AppError("Unauthorized", 401);
    }
};
exports.verifyReviewDate = verifyReviewDate;
