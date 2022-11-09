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
const bcryptjs_1 = require("bcryptjs");
const repositories_1 = require("../../utilities/repositories");
const appError_1 = require("../../errors/appError");
const verifyDateFormat_1 = require("../../utilities/verifyDateFormat");
const validators_1 = require("../../validators");
const createUserService = ({ name, email, birthDate, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        throw new appError_1.AppError("Password is missing", 400);
    }
    yield (0, validators_1.validatePassword)(password);
    (0, verifyDateFormat_1.verifyDateFormat)(birthDate);
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const newUser = repositories_1.usersRepository.create({
        name,
        email,
        birthDate,
        password: hashedPassword,
    });
    const userAlreadyExists = yield repositories_1.usersRepository.findOneBy({
        email,
    });
    if (userAlreadyExists) {
        throw new appError_1.AppError("Email is already exists", 409);
    }
    yield repositories_1.usersRepository.save(newUser);
    return newUser;
});
exports.default = createUserService;
