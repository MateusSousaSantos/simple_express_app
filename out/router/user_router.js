"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user_controller"));
const authenticateToke_1 = __importDefault(require("../controller/authenticateToke"));
const user_router = (0, express_1.Router)();
user_router.post("/login", user_controller_1.default.login);
user_router.post("/", user_controller_1.default.createUser);
user_router.get("/:id", authenticateToke_1.default.authenticateToken, user_controller_1.default.getUser);
exports.default = user_router;
