"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDateFormat = void 0;
const appError_1 = require("../errors/appError");
const verifyDateFormat = (date) => {
    const dateArray = date.split("/");
    if (dateArray.length !== 3 ||
        dateArray[0].length !== 4 ||
        Number(dateArray[1]) < 1 ||
        Number(dateArray[1]) > 12 ||
        Number(dateArray[2]) < 1 ||
        Number(dateArray[2]) > 31) {
        throw new appError_1.AppError("Invalid Date. Should be YYYY/MM/DD.", 400);
    }
};
exports.verifyDateFormat = verifyDateFormat;
