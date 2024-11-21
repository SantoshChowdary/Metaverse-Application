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
const spaceRouter = (0, express_1.Router)();
spaceRouter.post("/", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.CreateSpaceSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    console.log(parsedData.data.dimensions.split("x"));
    if (!parsedData.data.mapId) {
        const space = yield index_1.default.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),
                //    creatorId : req.userId,
                creator: {
                    connect: {
                        id: req.userId
                    }
                }
            }
        });
        res.json({ spaceId: space.id });
        return;
    }
    ;
    const map = yield index_1.default.map.findUnique({
        where: {
            id: parsedData.data.mapId
        }, select: {
            mapElements: true,
            width: true,
            height: true
        }
    });
    if (!map) {
        res.status(400).json({ message: "Map not found" });
        return;
    }
    ;
    let space = yield index_1.default.$transaction(() => __awaiter(void 0, void 0, void 0, function* () {
        const space = yield index_1.default.space.create({
            data: {
                name: parsedData.data.name,
                width: map.width,
                height: map.height,
                creatorId: req.userId
            }
        });
        yield index_1.default.spaceElements.createMany({
            data: map.mapElements.map(el => ({
                spaceId: space.id,
                elementId: el.elementId,
                x: el.x,
                y: el.y
            }))
        });
        return space;
    }));
    res.json({ spaceId: space.id });
    return;
}));
spaceRouter.delete("/:spaceId", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const space = yield index_1.default.space.findUnique({
        where: {
            id: req.params.spaceId
        }, select: {
            creatorId: true
        }
    });
    if (!space) {
        res.status(400).json({ message: "Space not found" });
        return;
    }
    ;
    if (space.creatorId !== req.userId) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    ;
    yield index_1.default.space.delete({
        where: {
            id: req.params.spaceId
        }
    });
    res.json({ message: "Space deleted" });
}));
spaceRouter.get("/all", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const spaces = yield index_1.default.space.findMany({
        where: {
            creatorId: req.userId
        }
    });
    res.json({
        spaces: spaces.map(space => ({
            id: space.id,
            name: space.name,
            dimensions: `${space.width}x${space.height}`,
            thumbnail: space.thumbnail
        }))
    });
}));
spaceRouter.get("/:spaceId", user_1.userMiddleware, user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const space = yield index_1.default.space.findUnique({
        where: {
            id: req.params.spaceId
        }
    });
    console.log(space);
    const spaceEl = yield index_1.default.spaceElements.findMany({
        where: {
            spaceId: req.params.spaceId
        }, select: {
            id: true,
            element: true,
            x: true,
            y: true
        }
    });
    console.log(spaceEl);
    if (!space) {
        res.status(400).json({ message: "Space not found" });
        return;
    }
    ;
    res.json({
        dimensions: `${space.width}x${space.height}`,
        elements: spaceEl
    });
}));
spaceRouter.post("/element", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.AddSpaceElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    const space = yield index_1.default.space.findUnique({
        where: {
            id: parsedData.data.spaceId
        }
    });
    if (!space) {
        res.status(400).json({ message: "Space not found" });
        return;
    }
    ;
    if (space.creatorId !== req.userId) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    ;
    const element = yield index_1.default.element.findUnique({
        where: {
            id: parsedData.data.elementId
        }
    });
    if (!element) {
        res.status(400).json({ message: "Element not found" });
        return;
    }
    ;
    yield index_1.default.spaceElements.create({
        data: {
            spaceId: parsedData.data.spaceId,
            elementId: parsedData.data.elementId,
            x: parsedData.data.x,
            y: parsedData.data.y
        }
    });
    res.json({ message: "Element added" });
}));
spaceRouter.delete("/element", user_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedDate = types_1.DeleteSPaceElementSchema.safeParse(req.body);
    if (!parsedDate.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    const spaceEl = yield index_1.default.spaceElements.findUnique({
        where: {
            id: parsedDate.data.id
        }
    });
    const space = yield index_1.default.space.findUnique({
        where: {
            id: spaceEl.spaceId
        }
    });
    if (!spaceEl) {
        res.status(400).json({ message: "Space element not found" });
        return;
    }
    ;
    if (space.creatorId !== req.userId) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    ;
    yield index_1.default.spaceElements.delete({
        where: {
            id: parsedDate.data.id
        }
    });
    res.json({ message: "Element deleted" });
}));
exports.default = spaceRouter;
