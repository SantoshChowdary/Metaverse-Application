"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMapSchema = exports.CreateAvatarSchema = exports.UpdateElementSchema = exports.CreateElementSchema = exports.DeleteSPaceElementSchema = exports.AddSpaceElementSchema = exports.CreateSpaceSchema = exports.UpdateMetaDataSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignUpSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(6),
    type: zod_1.default.enum(["User", "Admin"])
});
exports.SignInSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(6)
});
exports.UpdateMetaDataSchema = zod_1.default.object({
    avatarId: zod_1.default.string()
});
exports.CreateSpaceSchema = zod_1.default.object({
    name: zod_1.default.string(),
    dimensions: zod_1.default.string(),
    mapId: zod_1.default.any()
});
exports.AddSpaceElementSchema = zod_1.default.object({
    elementId: zod_1.default.string(),
    spaceId: zod_1.default.string(),
    x: zod_1.default.number(),
    y: zod_1.default.number()
});
exports.DeleteSPaceElementSchema = zod_1.default.object({
    id: zod_1.default.string(),
});
exports.CreateElementSchema = zod_1.default.object({
    imageUrl: zod_1.default.string(),
    width: zod_1.default.number(),
    height: zod_1.default.number(),
    static: zod_1.default.boolean()
});
exports.UpdateElementSchema = zod_1.default.object({
    imageUrl: zod_1.default.string()
});
exports.CreateAvatarSchema = zod_1.default.object({
    imageUrl: zod_1.default.string(),
    name: zod_1.default.string()
});
exports.CreateMapSchema = zod_1.default.object({
    thumbnail: zod_1.default.string(),
    dimensions: zod_1.default.string(),
    name: zod_1.default.string(),
    defaultElements: zod_1.default.array(zod_1.default.object({
        elementId: zod_1.default.string(),
        x: zod_1.default.number(),
        y: zod_1.default.number()
    }))
});
