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
const appError_1 = require("../../errors/appError");
const userDeleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield repositories_1.usersRepository.findOneBy({
        id,
    });
    if (!findUser) {
        throw new appError_1.AppError("User not found", 400);
    }
    if (!findUser.isActive) {
        throw new appError_1.AppError("User already inactive", 400);
    }
    yield repositories_1.usersRepository.update(id, {
        isActive: false,
    });
});
exports.default = userDeleteService;
