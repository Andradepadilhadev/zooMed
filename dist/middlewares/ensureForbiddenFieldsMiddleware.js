"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ensureForbiddenFieldsMiddleware = (req, res, next) => {
    if (req.body.hasOwnProperty("id") || req.body.hasOwnProperty("isActive")) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    return next();
};
exports.default = ensureForbiddenFieldsMiddleware;
