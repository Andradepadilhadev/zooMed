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
const appError_1 = require("../../errors/appError");
const repositories_1 = require("../../utilities/repositories");
const createAddressService = ({ district, zipCode, complement, number, city, state, }) => __awaiter(void 0, void 0, void 0, function* () {
    const addressAlreadyExists = yield repositories_1.addressRepository.findOne({
        where: { district, zipCode, complement, number, city, state },
    });
    if (addressAlreadyExists) {
        throw new appError_1.AppError("This address is already registered", 409);
    }
    const newAddress = repositories_1.addressRepository.create({
        district: district,
        zipCode: zipCode,
        complement: complement,
        number: number,
        city: city,
        state: state,
    });
    yield repositories_1.addressRepository.save(newAddress);
    return newAddress;
});
exports.default = createAddressService;
