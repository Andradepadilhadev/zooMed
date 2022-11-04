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
const appError_1 = require("../errors/appError");
const repositories_1 = require("../utilities/repositories");
const ensureUniqueAddressMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const addressFound = yield repositories_1.addressRepository.findOneBy({
        zipCode: req.body.zipCode,
        number: req.body.number,
        complement: req.body.complement,
        district: req.body.district,
        city: req.body.city,
        state: req.body.state,
    });
    if (addressFound) {
        throw new appError_1.AppError("This address already exists");
    }
    return next();
});
exports.default = ensureUniqueAddressMiddleware;
