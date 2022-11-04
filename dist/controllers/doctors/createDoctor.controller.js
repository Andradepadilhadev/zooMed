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
const class_transformer_1 = require("class-transformer");
const createDoctor_service_1 = __importDefault(require("../../services/doctors/createDoctor.service"));
const createDoctorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, birthDate, crmv } = req.body;
    const newDoctor = yield (0, createDoctor_service_1.default)({
        name,
        email,
        password,
        birthDate,
        crmv,
    });
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(newDoctor));
});
exports.default = createDoctorController;
