import User from "../models/user.model";
import Equipment from "../models/equipment.model";
import { encryptSync, compareSync } from "../utils/encrypt-utils";

class UserService {
  static async createUser(payload: any) {
    payload.password = encryptSync(payload.password);
    const user = await User.create(payload);
    return user;
  }

  static async getAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  static async getUserById(id: number) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  static async userExists(email: string) {
    if (!email) {
      throw new Error("Por favor proporcione email");
    }

    const user = await User.findOne({
      where: { email },
    });
    return user !== null;
  }

  static async validatePassword(email: string, password: string) {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return false;
    }
    return compareSync(password, user.password);
  }

  static async findOneUser(options: { email?: string; id?: number }) {
    const user = options.id
      ? await User.findByPk(options.id, {
          attributes: { exclude: ["password"] },
        })
      : await User.findOne({
          where: { email: options.email },
          attributes: { exclude: ["password"] },
        });

    return user;
  }

  static async updateUserById(userData: any, userId: number) {
    if (userData.password) {
      userData.password = encryptSync(userData.password);
    }

    const [affectedRows] = await User.update(userData, {
      where: { id: userId },
    });

    if (affectedRows === 0) {
      throw new Error("Usuario no encontrado");
    }

    return affectedRows;
  }

  static async deleteUserById(userId: number) {
    const deletedCount = await User.destroy({
      where: { id: userId },
    });

    if (deletedCount === 0) {
      throw new Error("Usuario no encontrado");
    }

    return deletedCount;
  }

  static async getUsersByRole(role: string) {
    const users = await User.findAll({
      where: { role },
      attributes: { exclude: ["password"] },
    });
    return users;
  }

  static async getUserWithEquipments(userId: number) {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Equipment,
          as: "equipments",
        },
      ],
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }
}

export default UserService;
