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
const updateSpeciesService = (name, id) => __awaiter(void 0, void 0, void 0, function* () {
    const findSpecies = yield repositories_1.speciesRepository.findOneBy({ id });
    if (!name) {
        throw new appError_1.AppError("Name field required", 400);
    }
    if (!findSpecies) {
        throw new appError_1.AppError("Species not found", 404);
    }
    yield repositories_1.speciesRepository.update(id, {
        name: name ? name : findSpecies.name,
    });
    const species = yield repositories_1.speciesRepository.findOneBy({ id });
    return species;
});
exports.default = updateSpeciesService;
