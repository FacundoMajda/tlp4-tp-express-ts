import { WhereOptions } from "sequelize";
import Equipment from "../models/equipment.model";
import User from "../models/user.model";
import { IRepository } from "../types/repo-interface";

export class EquipmentRepository implements IRepository<Equipment> {
  async find(filter: WhereOptions): Promise<Equipment[]> {
    const equipments = await Equipment.findAll({ where: filter });
    return equipments;
  }

  async findById(id: number): Promise<Equipment | null> {
    const equipment = await Equipment.findByPk(id);
    return equipment;
  }

  async create(data: {}): Promise<Equipment> {
    const equipment = await Equipment.create(data);
    return equipment;
  }

  async updateById(id: number, data: {}): Promise<Equipment> {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) throw new Error("Equipment not found");
    await equipment.update(data);
    return equipment;
  }

  async deleteById(id: number): Promise<void> {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) throw new Error("Equipment not found");
    await equipment.destroy();
  }

  async findAllWithUser(): Promise<Equipment[]> {
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

  async findByUserId(userId: number): Promise<Equipment[]> {
    const equipments = await Equipment.findAll({
      where: { userId },
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

  async findBySerialNumber(serialNumber: string): Promise<Equipment | null> {
    const equipment = await Equipment.findOne({
      where: { serialNumber },
    });
    return equipment;
  }

  async findWithIncludes(
    filter: WhereOptions,
    includes?: any[]
  ): Promise<Equipment[]> {
    const equipments = await Equipment.findAll({
      where: filter,
      include: includes,
    });
    return equipments;
  }
}
