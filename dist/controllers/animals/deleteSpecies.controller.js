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
const deleteSpecies_service_1 = __importDefault(require("../../services/animals/deleteSpecies.service"));
const deleteAnimalsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doctorId = req.user.id;
    const result = yield (0, deleteSpecies_service_1.default)(id, doctorId);
    return res.status(200).json({ message: result });
});
exports.default = deleteAnimalsController;
