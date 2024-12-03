import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
class Token {
  public static async authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers["authorization"];

      if (token == null) {
        res
          .status(401)
          .send({ error: "Not authorized to access this resource" });
        return;
      }

      jwt.verify(token, "caverna_do_mestre", (err: any, user: any) => {
        if (err) {
          res
            .status(403)
            .send({ error: "Not authorized to access this resource" });
          return;
        }
        next();
      });

      return;
    } catch (error) {
      res.status(401).send({ error: "Not authorized to access this resource" });
      return;
    }
  }
}
export default Token;
