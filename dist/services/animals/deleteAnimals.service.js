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
const appError_1 = require("../../errors/appError");
const repositories_1 = require("../../utilities/repositories");
const verifyUUID_1 = __importDefault(require("../../utilities/verifyUUID"));
const deleteAnimalService = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, verifyUUID_1.default)(id);
    const animals = yield repositories_1.animalsRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            user: true,
        },
    });
    if (!animals) {
        throw new appError_1.AppError("Animals not Found", 404);
    }
    if (animals.user.id !== userId) {
        throw new appError_1.AppError("You don't have authorization to delete this animal", 409);
    }
    yield repositories_1.animalsRepository.update(id, {
        isAlive: false,
    });
    return "Animal deleted with success";
});
exports.default = deleteAnimalService;
