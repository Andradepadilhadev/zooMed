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
exports.clinicUpdateController = exports.clinicListController = exports.clinicDeleteController = exports.clinicCreateController = void 0;
const clinicCreate_service_1 = __importDefault(require("../../services/clinic/clinicCreate.service"));
const clinicDelete_service_1 = __importDefault(require("../../services/clinic/clinicDelete.service"));
const clinicList_service_1 = __importDefault(require("../../services/clinic/clinicList.service"));
const clinicUpdate_service_1 = __importDefault(require("../../services/clinic/clinicUpdate.service"));
const clinicCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, contact, crmv_pj, address } = req.body;
    const createdClinic = yield (0, clinicCreate_service_1.default)({
        name,
        contact,
        crmv_pj,
        address,
    });
    return res.status(201).send(createdClinic);
});
exports.clinicCreateController = clinicCreateController;
const clinicDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, clinicDelete_service_1.default)(id);
    return res.status(203).send();
});
exports.clinicDeleteController = clinicDeleteController;
const clinicListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listed = yield (0, clinicList_service_1.default)();
    return res.status(200).send(listed);
});
exports.clinicListController = clinicListController;
const clinicUpdateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, contact, crmv_pj, address, clinicsDoctors } = req.body;
    const clinicUpdated = yield (0, clinicUpdate_service_1.default)(id, {
        name,
        contact,
        crmv_pj,
        address,
        clinicsDoctors,
    });
    return res.status(200).send(clinicUpdated);
});
exports.clinicUpdateController = clinicUpdateController;
