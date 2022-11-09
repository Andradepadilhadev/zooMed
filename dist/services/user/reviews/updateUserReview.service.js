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
const appError_1 = require("../../../errors/appError");
const repositories_1 = require("../../../utilities/repositories");
const verifyUUID_1 = __importDefault(require("../../../utilities/verifyUUID"));
const updateUserReviewService = (review, idReview, userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, verifyUUID_1.default)(idReview);
    const reviewToBeUpdated = yield repositories_1.reviewsRepository.findOne({
        where: { id: idReview },
        relations: { user: true },
    });
    if (!reviewToBeUpdated) {
        throw new appError_1.AppError("Review not found", 404);
    }
    if (reviewToBeUpdated.user.id != userId) {
        throw new appError_1.AppError("This is not your review", 403);
    }
    yield repositories_1.reviewsRepository.update(idReview, {
        review,
    });
    const reviewFind = yield repositories_1.reviewsRepository.findOneBy({ id: idReview });
    return reviewFind;
});
exports.default = updateUserReviewService;
