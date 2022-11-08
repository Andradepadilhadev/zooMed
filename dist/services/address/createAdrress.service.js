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
const repositories_1 = require("../../utilities/repositories");
const createAddressService = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const newAddress = repositories_1.addressRepository.create({
        district: address.district,
        zipCode: address.zipCode,
        complement: address.complement,
        number: address.number,
        city: address.city,
        state: address.state,
    });
    return newAddress;
});
exports.default = createAddressService;
