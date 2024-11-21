"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const adminMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header === null || header === void 0 ? void 0 : header.split(" ")[1];
    if (!token) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    ;
    try {
        const decodedVToken = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        // console.log(typeof decodedVToken)
        if (decodedVToken.role !== "Admin") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // appending userId to request object
        req.userId = decodedVToken.userId;
        // console.log("is next called")
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};
exports.adminMiddleware = adminMiddleware;
