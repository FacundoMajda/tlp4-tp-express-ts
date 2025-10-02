import { WhereOptions } from "sequelize";
import User from "../models/user.model";
import { IRepository } from "../types/repo-interface";

export class UserRepository implements IRepository<User> {
  async find(filter: WhereOptions): Promise<User[]> {
    const users = await User.findAll({ where: filter });
    return users;
  }

  async findById(id: number): Promise<User | null> {
    const user = await User.findByPk(id);
    return user;
  }

  async create(data: {}): Promise<User> {
    const user = await User.create(data);
    return user;
  }

  async updateById(id: number, data: {}): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.update(data);
    return user;
  }

  async deleteById(id: number): Promise<void> {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async findByIdWithExclusions(
    id: number,
    exclusions: string[]
  ): Promise<User | null> {
    const user = await User.findByPk(id, {
      attributes: { exclude: exclusions },
    });
    return user;
  }

  async findWithExclusions(
    filter: WhereOptions,
    exclusions: string[]
  ): Promise<User[]> {
    const users = await User.findAll({
      where: filter,
      attributes: { exclude: exclusions },
    });
    return users;
  }

  async findByIdWithIncludes(
    id: number,
    includes: any[]
  ): Promise<User | null> {
    const user = await User.findByPk(id, {
      include: includes,
    });
    return user;
  }

  async findByRole(role: string): Promise<User[]> {
    const users = await User.findAll({
      where: { role },
    });
    return users;
  }
}
