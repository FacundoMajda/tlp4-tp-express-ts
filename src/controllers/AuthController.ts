import { Request, Response } from "express";
import UserService from "../services/user.service";
import { MyRequest } from "../types/req";
import { sign } from "../utils/jwt-utils";

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email y contraseña son requeridos",
        });
        return;
      }

      const user = await UserService.findOneUser({ email });

      if (!user) {
        res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        });
        return;
      }

      const isValidPassword = await UserService.validatePassword(
        email,
        password
      );

      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        });
        return;
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = sign(payload);

      res.status(200).json({
        success: true,
        message: "Login exitoso",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: "Nombre, email y contraseña son requeridos",
        });
        return;
      }

      const userExists = await UserService.userExists(email);

      if (userExists) {
        res.status(409).json({
          success: false,
          message: "El usuario ya existe",
        });
        return;
      }

      const userData = {
        name,
        email,
        password,
        role: role || "user",
      };

      const newUser = await UserService.createUser(userData);

      const userWithoutPassword = await UserService.findOneUser({
        email: newUser.email,
      });

      res.status(201).json({
        success: true,
        message: "Usuario registrado correctamente",
        user: userWithoutPassword,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  public async logout(req: MyRequest, res: Response): Promise<void> {
    try {
      req.user = undefined;
      res.status(200).json({
        success: true,
        message: "Logout exitoso",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }
}
