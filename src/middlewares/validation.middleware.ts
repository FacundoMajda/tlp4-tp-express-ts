import { NextFunction, Response } from "express";
import { MyRequest } from "../types/req";
import UserService from "../services/user.service";

export const validateUserRegister = (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Nombre, email y contraseña son obligatorios",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Formato de email inválido",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener al menos 6 caracteres",
      });
    }
    if (role && !["admin", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Rol inválido. Los roles permitidos son: admin, user",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error en la validación de datos",
    });
  }
};

export const validateUserLogin = (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son obligatorios",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Formato de email inválido",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error en la validación de datos",
    });
  }
};

export const validateUserUpdate = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, role } = req.body;
    if (!name && !email && !role) {
      return res.status(400).json({
        success: false,
        message: "Debe proporcionar al menos un campo para actualizar",
      });
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Formato de email inválido",
        });
      }
    }
    if (role && !["admin", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Rol inválido. Los roles permitidos son: admin, user",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error en la validación de datos",
    });
  }
};

export const validateEquipment = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, type, serialNumber, purchaseDate, warrantyExpiry, userId } =
      req.body;
    if (!name || !type || !serialNumber || !userId) {
      return res.status(400).json({
        success: false,
        message:
          "Nombre, tipo, número de serie y ID de usuario asignado son obligatorios",
      });
    }
    const user = await UserService.findOneUser({ id: userId });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "El usuario asignado no existe",
      });
    }
    if (purchaseDate) {
      const purchaseDateObj = new Date(purchaseDate);
      if (isNaN(purchaseDateObj.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Formato de fecha de compra inválido",
        });
      }
    }
    if (warrantyExpiry) {
      const warrantyDateObj = new Date(warrantyExpiry);
      if (isNaN(warrantyDateObj.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Formato de fecha de garantía inválido",
        });
      }
    }
    if (purchaseDate && warrantyExpiry) {
      const purchaseDateObj = new Date(purchaseDate);
      const warrantyDateObj = new Date(warrantyExpiry);
      if (warrantyDateObj <= purchaseDateObj) {
        return res.status(400).json({
          success: false,
          message:
            "La fecha de garantía debe ser posterior a la fecha de compra",
        });
      }
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error en la validación de datos",
    });
  }
};
