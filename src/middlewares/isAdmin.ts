import { NextFunction, Response } from "express";
import { MyRequest } from "../types/req";

const isAdmin = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ error: true, errorMsg: "Autenticación requerida" });
    }
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: true, errorMsg: "Acceso de administrador requerido" });
    }
    return next();
  } catch (err) {
    let msg = "Error de autenticación";
    if (err instanceof Error) {
      msg = err.message;
    }
    return res.status(400).json({ errorMsg: msg, error: true });
  }
};
export default isAdmin;
