"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../errors/appError");
const ensureUUIDMiddleware = (req, res, next) => {
    const id = req.user.id;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const test = regexExp.test(id);
    if (!test) {
        throw new appError_1.AppError("Invalid id", 400);
    }
};
exports.default = ensureUUIDMiddleware;
