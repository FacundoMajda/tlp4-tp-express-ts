import { NextFunction, Response } from "express";
import { MyRequest } from "../types/req";
import { verify } from "../utils/jwt-utils";
import UserService from "../services/user.service";

const isAuth = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: true, errorMsg: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];
    const data = verify(token);

    if (!data.valid || !data.decoded) {
      return res
        .status(401)
        .json({ error: true, errorMsg: data.msg || "Token inválido" });
    }

    const decoded = data.decoded as any;
    const userId = decoded.userId || decoded.id;
    const user = await UserService.findOneUser({ id: userId });

    if (!user) {
      return res
        .status(401)
        .json({ error: true, errorMsg: "Usuario no encontrado" });
    }
    req.user = user;

    return next();
  } catch (err) {
    let msg = "Token inválido";
    if (err instanceof Error) {
      msg = err.message;
    }
    return res.status(401).json({ errorMsg: msg, error: true });
  }
};

export default isAuth;
