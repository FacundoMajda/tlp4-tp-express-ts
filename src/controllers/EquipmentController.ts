import { Response } from "express";
import EquipmentService from "../services/equipment.service";
import { MyRequest } from "../types/req";

export class EquipmentController {
  private equipmentService: EquipmentService;

  constructor(equipmentService: EquipmentService) {
    this.equipmentService = equipmentService;
  }
  public async getEquipment(req: MyRequest, res: Response): Promise<void> {
    try {
      const equipments = await this.equipmentService.getAllEquipments();
      res.status(200).json({
        success: true,
        message: "Lista de equipos obtenida correctamente",
        data: equipments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  public async getEquipmentById(req: MyRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const equipment = await this.equipmentService.getEquipmentById(
        Number(id)
      );

      res.status(200).json({
        success: true,
        message: `Equipo con ID ${id} encontrado`,
        data: equipment,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al obtener equipo";
      const status = message.includes("Equipo no encontrado") ? 404 : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }

  public async createEquipment(req: MyRequest, res: Response): Promise<void> {
    try {
      const equipmentData = req.body;
      const equipment = await this.equipmentService.createEquipment(
        equipmentData
      );

      res.status(201).json({
        success: true,
        message: "Equipo creado correctamente",
        data: equipment,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al crear equipo";
      const status = message.includes("El usuario asignado no existe")
        ? 400
        : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }

  public async updateEquipment(req: MyRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const equipmentData = req.body;
      const equipment = await this.equipmentService.updateEquipment(
        Number(id),
        equipmentData
      );

      res.status(200).json({
        success: true,
        message: `Equipo con ID ${id} actualizado correctamente`,
        data: equipment,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al actualizar equipo";
      let status = 500;

      if (message.includes("Equipo no encontrado")) status = 404;
      else if (message.includes("El usuario asignado no existe")) status = 400;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }

  public async deleteEquipment(req: MyRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.equipmentService.deleteEquipment(Number(id));

      res.status(200).json({
        success: true,
        message: `Equipo con ID ${id} eliminado correctamente`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al eliminar equipo";
      const status = message.includes("Equipo no encontrado") ? 404 : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }

  public async getEquipmentsByUserId(
    req: MyRequest,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const equipments = await this.equipmentService.getEquipmentsByUserId(
        Number(userId)
      );

      res.status(200).json({
        success: true,
        message: `Usuario y equipos con ID ${userId} obtenidos correctamente`,
        data: equipments,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error al obtener equipos del usuario";
      const status = message.includes("Usuario no encontrado") ? 404 : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }

  public async getEquipmentsByStatus(
    req: MyRequest,
    res: Response
  ): Promise<void> {
    try {
      const { status } = req.params;
      const equipments = await this.equipmentService.getEquipmentsByStatus(
        status
      );

      res.status(200).json({
        success: true,
        message: `Equipos con estado ${status} obtenidos correctamente`,
        data: equipments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al obtener equipos por estado",
      });
    }
  }

  public async updateEquipmentStatus(
    req: MyRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const equipment = await this.equipmentService.updateEquipmentStatus(
        Number(id),
        status
      );

      res.status(200).json({
        success: true,
        message: `Estado del equipo con ID ${id} actualizado correctamente`,
        data: equipment,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error al actualizar estado del equipo";
      const status = message.includes("Equipo no encontrado") ? 404 : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }

  public async getEquipmentBySerialNumber(
    req: MyRequest,
    res: Response
  ): Promise<void> {
    try {
      const { serialNumber } = req.params;
      const equipment = await this.equipmentService.getEquipmentBySerialNumber(
        serialNumber
      );

      res.status(200).json({
        success: true,
        message: `Equipo con número de serie ${serialNumber} encontrado`,
        data: equipment,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error al obtener equipo por número de serie";
      const status = message.includes("Equipo no encontrado") ? 404 : 500;

      res.status(status).json({
        success: false,
        message,
      });
    }
  }
}

export default EquipmentController;
