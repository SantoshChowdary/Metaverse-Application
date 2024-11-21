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
const express_1 = require("express");
const types_1 = require("../../types");
const index_1 = __importDefault(require("../../../../db/index"));
const user_1 = require("../../middleware/user");
const userRouter = (0, express_1.Router)();
userRouter.put("/metadata", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.UpdateMetaDataSchema.safeParse(req.body);
    console.log(parsedData);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    const avatar = yield index_1.default.avatar.findUnique({
        where: {
            id: parsedData.data.avatarId
        }
    });
    if (!avatar) {
        res.status(404).json({ message: "Avatar not found" });
        return;
    }
    ;
    yield index_1.default.user.update({
        where: {
            id: req.userId
        },
        data: {
            avatarId: parsedData.data.avatarId
        }
    });
    res.json({ message: "Metadata updated" });
}));
userRouter.get("/metadata/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersList = req.query.ids.replace("[", "").replace("]", "").replace(" ", "").split(",");
    const metadata = yield index_1.default.user.findMany({
        where: {
            id: {
                in: usersList
            }
        }, select: {
            id: true,
            avatar: true
        }
    });
    res.json({
        avatars: metadata.map(item => {
            var _a;
            return ({
                userId: item.id,
                imageUrl: (_a = item.avatar) === null || _a === void 0 ? void 0 : _a.imageUrl
            });
        })
    });
}));
exports.default = userRouter;
