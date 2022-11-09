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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../../utilities/repositories");
const appError_1 = require("../../errors/appError");
const verifyUUID_1 = __importDefault(require("../../utilities/verifyUUID"));
const userDeleteService = (loggedId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, verifyUUID_1.default)(userId);
    if (loggedId !== userId) {
        throw new appError_1.AppError("Not your profile to update", 403);
    }
    const findUser = yield repositories_1.usersRepository.findOneBy({
        id: loggedId,
    });
    if (!findUser.isActive) {
        throw new appError_1.AppError("User already inactive", 400);
    }
    yield repositories_1.usersRepository.update(loggedId, {
        isActive: false,
    });
    return { message: "User deleted successfully" };
});
exports.default = userDeleteService;
