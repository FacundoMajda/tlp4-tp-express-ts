import Equipment from "../models/equipment.model";
import User from "../models/user.model";

class EquipmentService {
  static async createEquipment(equipmentData: any) {
    if (equipmentData.userId) {
      const userExists = await User.findByPk(equipmentData.userId);
      if (!userExists) {
        throw new Error("El usuario asignado no existe");
      }
    }

    const equipment = await Equipment.create(equipmentData);
    return equipment;
  }

  static async getAllEquipments() {
    const equipments = await Equipment.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return equipments;
  }

  static async getEquipmentById(id: number) {
    const equipment = await Equipment.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }
    return equipment;
  }

  static async updateEquipment(id: number, equipmentData: any) {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }

    if (equipmentData.userId) {
      const userExists = await User.findByPk(equipmentData.userId);
      if (!userExists) {
        throw new Error("El usuario asignado no existe");
      }
    }

    await Equipment.update(equipmentData, {
      where: { id },
    });

    return await Equipment.findByPk(id);
  }

  static async deleteEquipment(id: number) {
    const deletedCount = await Equipment.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      throw new Error("Equipo no encontrado");
    }

    return deletedCount;
  }

  static async getEquipmentsByUserId(userId: number) {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Equipment,
          as: "equipments",
        },
      ],
      attributes: ["id", "name", "email"],
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }

  static async getEquipmentsByStatus(status: string) {
    const equipments = await Equipment.findAll({
      where: { status },
    });
    return equipments;
  }

  static async updateEquipmentStatus(id: number, status: string) {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }

    await Equipment.update({ status }, { where: { id } });
    return await Equipment.findByPk(id);
  }

  static async getEquipmentBySerialNumber(serialNumber: string) {
    const equipment = await Equipment.findOne({
      where: { serialNumber },
    });
    if (!equipment) {
      throw new Error("Equipo no encontrado");
    }
    return equipment;
  }
}

export default EquipmentService;
