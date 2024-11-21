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
const admin_1 = require("../../middleware/admin");
const adminRouter = (0, express_1.Router)();
adminRouter.post("/element", admin_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.CreateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    const element = yield index_1.default.element.create({
        data: {
            imageUrl: parsedData.data.imageUrl,
            width: parsedData.data.width,
            height: parsedData.data.height,
            static: parsedData.data.static
        }
    });
    res.json({ elementId: element.id });
}));
adminRouter.put("/element/:elementId", admin_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.UpdateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    const element = yield index_1.default.element.findUnique({
        where: {
            id: req.params.elementId
        }
    });
    if (!element) {
        res.status(404).json({ message: "Element not found" });
        return;
    }
    ;
    yield index_1.default.element.update({
        data: {
            imageUrl: parsedData.data.imageUrl,
        }, where: {
            id: req.params.elementId
        }
    });
    res.json({ message: "Element updated" });
}));
adminRouter.post("/avatar", admin_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = types_1.CreateAvatarSchema.safeParse(req.body);
    if (!parseData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    const avatar = yield index_1.default.avatar.create({
        data: {
            imageUrl: parseData.data.imageUrl,
            name: parseData.data.name
        }
    });
    res.json({ avatarId: avatar.id });
}));
adminRouter.post("/map", admin_1.adminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.CreateMapSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    const map = yield index_1.default.map.create({
        data: {
            name: parsedData.data.name,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail: parsedData.data.thumbnail
        }
    });
    yield index_1.default.mapElements.createMany({
        data: parsedData.data.defaultElements.map(item => ({
            mapId: map.id,
            elementId: item.elementId,
            x: item.x,
            y: item.y
        }))
    });
    res.json({ mapId: map.id });
}));
exports.default = adminRouter;
