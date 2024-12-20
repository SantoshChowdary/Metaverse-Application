"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header === null || header === void 0 ? void 0 : header.split(" ")[1];
    if (!token) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    ;
    try {
        const decodedVToken = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        // appending userId to request object
        req.userId = decodedVToken.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};
exports.userMiddleware = userMiddleware;
