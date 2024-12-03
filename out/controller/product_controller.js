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
const products_json_1 = __importDefault(require("../data/products.json"));
const fs_1 = __importDefault(require("fs"));
const product_1 = __importDefault(require("../class/product"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "data/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
class Produtos_Controller {
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, description, category } = req.body;
            if (!name || !price || !description || !category) {
                console.log(name, price, description, category);
                res.status(400).json({ message: "Missing required fields" });
                return;
            }
            var image_url = "";
            upload.single("image")(req, {}, (err) => {
                if (err) {
                    res.status(500).json({ message: "Error uploading file: " + err });
                    return;
                }
                if (!req.file) {
                    image_url = "http://localhost:5000/uploads/1730825064651-undraw_Fitting_piece_re_pxay.png";
                    return;
                }
                image_url = `${req.protocol}}://${req.get("host")}/uploads/${req.file.filename}`;
            });
            const new_product = new product_1.default((0, uid_1.uid)(), name, price, description, category, image_url);
            products_json_1.default.products.push(new_product);
            fs_1.default.writeFileSync("./data/products.json", JSON.stringify(products_json_1.default, null, 2));
            res.status(201).json(new_product);
            return;
        });
    }
    static getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = products_json_1.default.products.filter((product) => product.id === id);
            if (product.length === 0) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json(product[0]);
            return;
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json(products_json_1.default.products);
            return;
        });
    }
    static uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            upload.single("image")(req, {}, (err) => {
                if (err) {
                    return { message: "Error uploading file: " + err };
                }
                if (!req.file) {
                    return { message: "No file uploaded." };
                }
                res.status(201).json({
                    image_url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
                });
                return;
            });
        });
    }
}
exports.default = Produtos_Controller;
