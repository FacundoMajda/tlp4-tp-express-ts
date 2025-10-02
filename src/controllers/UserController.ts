import { Request, Response } from "express";
import UserService from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
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

      await this.userService.updateUserById(userData, parseInt(id));
      const updatedUser = await this.userService.findOneUser({
        id: parseInt(id),
      });

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
      await this.userService.deleteUserById(parseInt(id));

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
      const user = await this.userService.getUserById(parseInt(id));

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

      const userExists = await this.userService.userExists(userData.email);
      if (userExists) {
        res.status(409).json({
          success: false,
          message: "El usuario ya existe",
        });
        return;
      }

      const newUser = await this.userService.createUser(userData);
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
      const users = await this.userService.getUsersByRole(role);

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
      const userWithEquipments = await this.userService.getUserWithEquipments(
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
