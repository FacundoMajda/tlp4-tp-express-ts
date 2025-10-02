import Equipment from "../models/equipment.model";
import User from "../models/user.model";
import { EquipmentRepository } from "../repositories/equipment.repository";

class EquipmentService {
  private equipmentRepository: EquipmentRepository;

  constructor(equipmentRepository: EquipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async createEquipment(equipmentData: any) {
    if (equipmentData.userId) {
      const userExists = await User.findByPk(equipmentData.userId);
      if (!userExists) {
        throw new Error("El usuario asignado no existe");
      }
    }

    const equipment = await this.equipmentRepository.create(equipmentData);
    return equipment;
  }

  async getAllEquipments() {
    const equipments = await this.equipmentRepository.findAllWithUser();
    return equipments;
  }

  async getEquipmentById(id: number) {
    const equipment = await this.equipmentRepository.findById(id);
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }

    const equipmentWithUser = await this.equipmentRepository.findWithIncludes(
      { id },
      [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ]
    );

    return equipmentWithUser[0];
  }

  async updateEquipment(id: number, equipmentData: any) {
    const equipment = await this.equipmentRepository.findById(id);
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }

    if (equipmentData.userId) {
      const userExists = await User.findByPk(equipmentData.userId);
      if (!userExists) {
        throw new Error("El usuario asignado no existe");
      }
    }

    const updatedEquipment = await this.equipmentRepository.updateById(
      id,
      equipmentData
    );
    return updatedEquipment;
  }

  async deleteEquipment(id: number) {
    const equipment = await this.equipmentRepository.findById(id);
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }

    await this.equipmentRepository.deleteById(id);
    return 1;
  }

  async getEquipmentsByUserId(userId: number) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const equipments = await this.equipmentRepository.findByUserId(userId);
    return {
      ...user.toJSON(),
      equipments,
    };
  }

  async getEquipmentsByStatus(status: string) {
    const equipments = await this.equipmentRepository.find({ status });
    return equipments;
  }

  async updateEquipmentStatus(id: number, status: string) {
    const equipment = await this.equipmentRepository.findById(id);
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }

    const updatedEquipment = await this.equipmentRepository.updateById(id, {
      status,
    });
    return updatedEquipment;
  }

  async getEquipmentBySerialNumber(serialNumber: string) {
    const equipment = await this.equipmentRepository.findBySerialNumber(
      serialNumber
    );
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }
    return equipment;
  }
}

export default EquipmentService;
