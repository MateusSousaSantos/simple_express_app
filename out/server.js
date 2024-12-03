"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_router_1 = __importDefault(require("./router/user_router"));
const produtos_router_1 = __importDefault(require("./router/produtos_router"));
const server = (0, express_1.default)();
server.get("/", (req, res) => {
    res.send("Servidor ligado");
});
server.use(body_parser_1.default.json());
server.use((0, cors_1.default)());
server.use("/uploads", express_1.default.static("data/uploads"));
server.use("/usuarios", user_router_1.default);
server.use("/produtos", produtos_router_1.default);
server.listen(5000, () => {
    console.log("server listening at port 5000");
});
