import { Request, Response } from "express";
import { uid } from "uid";
import userdb from "../data/users.json";
import User from "../class/user";
import fs from 'fs';
import jwt from "jsonwebtoken";
import bycript from "bcryptjs";

class User_Controller {
  public static async createUser(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      res.statusCode = 400;
      res.send("Preencha todos os campos");
      return;
    }

    const uuid = uid(6);
    const new_user = new User(uuid, nome, email, senha);
    await new_user.setPassword(senha);

    userdb.users.push(new_user);

    fs.writeFileSync("./data/users.json", JSON.stringify(userdb, null, 2));

    res.statusCode = 200;
    res.send({
      message: "Usuario criado com sucesso",
      user: new_user,
    });
  }
  public static async getUser(req: Request, res: Response) {
    const { uid } = req.params;
    const user = userdb.users.filter((user) => user.id != uid);
    res.statusCode == 200;
    res.send(user[0]);
  }

  public static async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.statusCode = 400;
      res.send("Preencha todos os campos");
      return;
    }

    const user = userdb.users.filter((user) => user.email === email)[0] as User;
    if (!user) {
      res.statusCode = 404;
      res.send("Usuario não encontrado");
      return;
    }

    const isPasswordValid = await bycript.compare(senha, user.senha);

    if (!isPasswordValid) {
      res.statusCode = 401;
      res.send("Senha incorreta");
      return;
    }

    const token = jwt.sign({ id: user.id }, "caverna_do_mestre", {
      expiresIn: "5h",
    });

    res.statusCode = 200;
    res.send({
      message: "Usuario logado com sucesso",
      token: token
    });
  }

}

export default User_Controller;
