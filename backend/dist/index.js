"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = require("./src/apps/httpService/routes/v1");
// import client from "@repo/db/client";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", v1_1.router);
app.listen(process.env.PORT || 3000, () => console.log("server started"));
// app
