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
const updateAddressService = (address, id) => __awaiter(void 0, void 0, void 0, function* () {
    const addressToBeUpdated = yield repositories_1.addressRepository.findOneBy({ id });
    yield repositories_1.addressRepository.update(id, {
        zipCode: address.zipCode ? address.zipCode : addressToBeUpdated.zipCode,
        number: address.number ? address.number : addressToBeUpdated.number,
        complement: address.complement ? address.complement : addressToBeUpdated.complement,
        district: address.district ? address.district : addressToBeUpdated.district,
        city: address.city ? address.city : addressToBeUpdated.city,
        state: address.state ? address.state : addressToBeUpdated.state,
    });
});
exports.default = updateAddressService;
