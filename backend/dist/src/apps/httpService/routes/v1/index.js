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
exports.router = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const space_1 = __importDefault(require("./space"));
const admin_1 = __importDefault(require("./admin"));
const types_1 = require("../../types");
const index_1 = __importDefault(require("../../../../db/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const user_2 = require("../../middleware/user");
exports.router = (0, express_1.Router)();
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.SignUpSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Validation failed" });
        return;
    }
    ;
    try {
        const findUser = yield index_1.default.user.findUnique({
            where: {
                username: parsedData.data.username
            }
        });
        if (findUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        else {
            const createdUser = yield index_1.default.user.create({
                data: {
                    username: parsedData.data.username,
                    password: bcrypt_1.default.hashSync(parsedData.data.password, 10),
                    // password : parsedData.data.password,
                    role: parsedData.data.type === "Admin" ? "Admin" : "User"
                }
            });
            res.json({
                userId: createdUser.id
            });
        }
    }
    catch (error) {
        res.status(400).json({ message: "User already exists" });
    }
}));
exports.router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.SignInSchema.safeParse(req.body);
    // console.log(parsedData)
    if (!parsedData.success) {
        res.status(403).json({ message: "Validation failed" });
        return;
    }
    ;
    try {
        const user = yield index_1.default.user.findUnique({
            where: {
                username: parsedData.data.username
            }
        });
        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }
        const isValid = yield bcrypt_1.default.compare(parsedData.data.password, user.password);
        if (!isValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        ;
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: user.role
        }, config_1.JWT_PASSWORD);
        res.json({
            token: token
        });
        // console.log(res)
    }
    catch (_a) {
        res.status(403).json({ message: "User not found" });
    }
}));
exports.router.get("/elements", user_2.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const elements = yield index_1.default.element.findMany({
        select: {
            id: true,
            imageUrl: true,
            width: true,
            height: true,
            static: true
        }
    });
    res.json(elements);
}));
exports.router.get("/avatars", user_2.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const avatars = yield index_1.default.avatar.findMany({
        select: {
            id: true,
            imageUrl: true,
            name: true
        }
    });
    res.json(avatars);
}));
exports.router.use("/user", user_1.default);
exports.router.use("/space", space_1.default);
exports.router.use("/admin", admin_1.default);
