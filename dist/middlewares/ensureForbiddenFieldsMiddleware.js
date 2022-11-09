"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ensureForbiddenFieldsMiddleware = (req, res, next) => {
    if (req.body.hasOwnProperty("id") || req.body.hasOwnProperty("isActive")) {
        return res.status(403).json({
            message: "Cannot update id or isActive",
        });
    }
    return next();
};
exports.default = ensureForbiddenFieldsMiddleware;
