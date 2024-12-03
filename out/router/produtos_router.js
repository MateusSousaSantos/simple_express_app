"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product_controller"));
const authenticateToke_1 = __importDefault(require("../controller/authenticateToke"));
const produtos_router = (0, express_1.Router)();
produtos_router.get("/", product_controller_1.default.getAllProducts);
produtos_router.get("/:id", authenticateToke_1.default.authenticateToken, product_controller_1.default.getProduct);
produtos_router.post("/", authenticateToke_1.default.authenticateToken, product_controller_1.default.createProduct);
produtos_router.put("/:id", authenticateToke_1.default.authenticateToken, product_controller_1.default.updateProduct);
produtos_router.delete("/:id", authenticateToke_1.default.authenticateToken, product_controller_1.default.deleteProduct);
produtos_router.post("/upload", authenticateToke_1.default.authenticateToken, product_controller_1.default.uploadImage);
exports.default = produtos_router;
