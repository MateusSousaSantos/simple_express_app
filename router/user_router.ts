import { Router } from "express";
import User_Controller from "../controller/user_controller";
import Token from "../controller/authenticateToke";

const user_router = Router();

user_router.post("/login",User_Controller.login)
user_router.post("/",User_Controller.createUser)
user_router.get("/:id",Token.authenticateToken , User_Controller.getUser)

export default user_router