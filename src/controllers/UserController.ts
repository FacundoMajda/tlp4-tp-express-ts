import { Request, Response } from "express";
import UserService from "../services/user.service";

export class UserController {
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        success: true,
        message: "Lista de usuarios obtenida correctamente",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData = req.body;

      await UserService.updateUserById(userData, parseInt(id));
      const updatedUser = await UserService.findOneUser({ id: parseInt(id) });

      res.status(200).json({
        success: true,
        message: `Usuario con ID ${id} actualizado correctamente`,
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al actualizar usuario",
      });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await UserService.deleteUserById(parseInt(id));

      res.status(200).json({
        success: true,
        message: `Usuario con ID ${id} eliminado correctamente`,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Error al eliminar usuario",
      });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(parseInt(id));

      res.status(200).json({
        success: true,
        message: `Usuario con ID ${id} encontrado`,
        data: user,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al obtener usuario";
      const status = message === "Usuario no encontrado" ? 404 : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;

      const userExists = await UserService.userExists(userData.email);
      if (userExists) {
        res.status(409).json({
          success: false,
          message: "El usuario ya existe",
        });
        return;
      }

      const newUser = await UserService.createUser(userData);
      const { password, ...userWithoutPassword } = newUser.toJSON();

      res.status(201).json({
        success: true,
        message: "Usuario creado correctamente",
        data: userWithoutPassword,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Error al crear usuario",
      });
    }
  }

  public async getUsersByRole(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.params;
      const users = await UserService.getUsersByRole(role);

      res.status(200).json({
        success: true,
        message: `Usuarios con rol ${role} obtenidos correctamente`,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al obtener usuarios por rol",
      });
    }
  }

  public async getUserWithEquipments(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const userWithEquipments = await UserService.getUserWithEquipments(
        parseInt(id)
      );

      res.status(200).json({
        success: true,
        message: `Usuario con ID ${id} y sus equipos obtenidos correctamente`,
        data: userWithEquipments,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error al obtener usuario con equipos";
      const status = message.includes("Usuario no encontrado") ? 404 : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }
}

export default UserController;
