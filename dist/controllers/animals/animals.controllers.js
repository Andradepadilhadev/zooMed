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
exports.deleteSpeciesController = exports.updateSpeciesController = exports.listSpeciesController = exports.deleteAnimalsController = exports.createSpeciesController = exports.createAnimalsController = void 0;
const createAnimals_service_1 = __importDefault(require("../../services/animals/createAnimals.service"));
const createSpecies_service_1 = __importDefault(require("../../services/animals/createSpecies.service"));
const listSpecies_service_1 = __importDefault(require("../../services/animals/listSpecies.service"));
const updateSpecies_service_1 = __importDefault(require("../../services/animals/updateSpecies.service"));
const deleteAnimals_service_1 = __importDefault(require("../../services/animals/deleteAnimals.service"));
const deleteSpecies_service_1 = __importDefault(require("../../services/animals/deleteSpecies.service"));
const createAnimalsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userId = req.user.id;
    const createAnimals = yield (0, createAnimals_service_1.default)(data, userId);
    return res.status(201).json(createAnimals);
});
exports.createAnimalsController = createAnimalsController;
const createSpeciesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const createSpecies = yield (0, createSpecies_service_1.default)(name);
    return res.status(201).json(createSpecies);
});
exports.createSpeciesController = createSpeciesController;
const listSpeciesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const species = yield (0, listSpecies_service_1.default)();
    return res.status(200).json(species);
});
exports.listSpeciesController = listSpeciesController;
const updateSpeciesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const updateSpecies = yield (0, updateSpecies_service_1.default)(name, id);
    return res.status(200).json(updateSpecies);
});
exports.updateSpeciesController = updateSpeciesController;
const deleteAnimalsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    const result = yield (0, deleteAnimals_service_1.default)(id, userId);
    return res.status(200).json({ message: result });
});
exports.deleteAnimalsController = deleteAnimalsController;
const deleteSpeciesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doctorId = req.user.id;
    const result = yield (0, deleteSpecies_service_1.default)(id, doctorId);
    return res.status(200).json({ message: result });
});
exports.deleteSpeciesController = deleteSpeciesController;
