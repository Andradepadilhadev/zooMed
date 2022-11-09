"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../errors/appError");
const uuid_1 = require("uuid");
const verifyUUID = (id) => {
    if (!(0, uuid_1.validate)(id)) {
        throw new appError_1.AppError("Invalid id", 400);
    }
};
exports.default = verifyUUID;
