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
const uid_1 = require("uid");
const users_json_1 = __importDefault(require("../data/users.json"));
const user_1 = __importDefault(require("../class/user"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User_Controller {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) {
                res.statusCode = 400;
                res.send("Preencha todos os campos");
                return;
            }
            const uuid = (0, uid_1.uid)(6);
            const new_user = new user_1.default(uuid, nome, email, senha);
            yield new_user.setPassword(senha);
            users_json_1.default.users.push(new_user);
            fs_1.default.writeFileSync("./data/users.json", JSON.stringify(users_json_1.default, null, 2));
            res.statusCode = 200;
            res.send({
                message: "Usuario criado com sucesso",
                user: new_user,
            });
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid } = req.params;
            const user = users_json_1.default.users.filter((user) => user.id != uid);
            res.statusCode == 200;
            res.send(user[0]);
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            if (!email || !senha) {
                res.statusCode = 400;
                res.send("Preencha todos os campos");
                return;
            }
            const user = users_json_1.default.users.filter((user) => user.email === email)[0];
            if (!user) {
                res.statusCode = 404;
                res.send("Usuario não encontrado");
                return;
            }
            console.log(user);
            const isPasswordValid = yield bcryptjs_1.default.compare(senha, user.senha);
            if (!isPasswordValid) {
                res.statusCode = 401;
                res.send("Senha incorreta");
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, "caverna_do_mestre", {
                expiresIn: "5h",
            });
            res.statusCode = 200;
            res.send({
                message: "Usuario logado com sucesso",
                token: token
            });
        });
    }
}
exports.default = User_Controller;
