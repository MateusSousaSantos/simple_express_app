import { Router } from "express";
import Produtos_Controller from "../controller/product_controller";
import Token from "../controller/authenticateToke";

const produtos_router = Router();

produtos_router.get("/", Produtos_Controller.getAllProducts);
produtos_router.get("/:id",Token.authenticateToken, Produtos_Controller.getProduct);
produtos_router.post("/",Token.authenticateToken, Produtos_Controller.createProduct);
produtos_router.put("/:id",Token.authenticateToken, Produtos_Controller.updateProduct);
produtos_router.delete("/:id",Token.authenticateToken, Produtos_Controller.deleteProduct);

produtos_router.post("/upload",Token.authenticateToken, Produtos_Controller.uploadImage);

export default produtos_router;