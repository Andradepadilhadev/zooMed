"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ensureForbiddenFieldsMiddleware = (req, res, next) => {
    if (req.body.hasOwnProperty("id") ||
        req.body.hasOwnProperty("isActive") ||
        req.body.hasOwnProperty("id")) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
exports.default = ensureForbiddenFieldsMiddleware;
