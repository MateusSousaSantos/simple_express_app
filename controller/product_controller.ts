import { Request, Response } from "express";
import { uid } from "uid";
import productsdb from "../data/products.json";
import fs from "fs";
import Product from "../class/product";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "data/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

class Produtos_Controller {
  public static async createProduct(req: Request, res: Response) {
    const { name, price, description, category } = req.body;
    if (!name || !price || !description || !category) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }


    var image_url = "";

    upload.single("image")(req, {} as Response, (err) => {
      if (err) {
        res.status(500).json({ message: "Error uploading file: " + err });
        return;
      }

      if (!req.file) {
        image_url = "http://localhost:5000/uploads/1730825064651-undraw_Fitting_piece_re_pxay.png";
        return;
      }

      image_url = `${req.protocol}}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    });

    const new_product = new Product(
      uid(),
      name,
      price,
      description,
      category,
      image_url
    );

    productsdb.products.push(new_product);

    fs.writeFileSync(
      "./data/products.json",
      JSON.stringify(productsdb, null, 2)
    );

    res.status(201).json(new_product);
    return;
  }

  public static async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product = productsdb.products.filter((product) => product.id === id);
    if (product.length === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product[0]);
    return;
  }

  public static async updateProduct(req: Request, res: Response) {}

  public static async deleteProduct(req: Request, res: Response) {}

  public static async getAllProducts(req: Request, res: Response) {
    res.status(200).json(productsdb.products);
    return;
  }

  public static async uploadImage(req: Request, res: Response) {
    upload.single("image")(req, {} as Response, (err) => {
      if (err) {
        return { message: "Error uploading file: " + err };
      }

      if (!req.file) {
        return { message: "No file uploaded." };
      }
      
      res.status(201).json({
        image_url: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      });
      return 
    });
  }
}

export default Produtos_Controller;
