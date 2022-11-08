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
const repositories_2 = require("../../utilities/repositories");
const verifyDateFormat_1 = require("../../utilities/verifyDateFormat");
const createAnimalsServices = ({ name, birthDate, breed, species }, userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, verifyDateFormat_1.verifyDateFormat)(birthDate);
    const speciesName = yield repositories_2.speciesRepository.findOneBy({
        name: species,
    });
    const user = yield repositories_1.usersRepository.findOneBy({ id: userId });
    if (!speciesName) {
        throw new appError_1.AppError("Species not found", 404);
    }
    const createAnimals = repositories_1.animalsRepository.create({
        name: name,
        birthDate: birthDate,
        breed: breed,
        species: speciesName,
        user: user,
    });
    yield repositories_1.animalsRepository.save(createAnimals);
    return createAnimals;
});
exports.default = createAnimalsServices;
