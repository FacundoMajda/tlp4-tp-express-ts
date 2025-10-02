import User from "../models/user.model";
import Equipment from "../models/equipment.model";
import { encryptSync, compareSync } from "../utils/encrypt-utils";
import { UserRepository } from "../repositories/user.repository";

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(payload: any) {
    payload.password = encryptSync(payload.password);
    const user = await this.userRepository.create(payload);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findWithExclusions({}, [
      "password",
    ]);
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByIdWithExclusions(id, [
      "password",
    ]);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  async userExists(email: string) {
    if (!email) {
      throw new Error("Por favor proporcione email");
    }

    const user = await this.userRepository.findByEmail(email);
    return user !== null;
  }

  async validatePassword(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }
    return compareSync(password, user.password);
  }

  async findOneUser(options: { email?: string; id?: number }) {
    const user = options.id
      ? await this.userRepository.findByIdWithExclusions(options.id, [
          "password",
        ])
      : options.email
      ? await this.userRepository.findByEmail(options.email)
      : null;

    return user;
  }

  async updateUserById(userData: any, userId: number) {
    if (userData.password) {
      userData.password = encryptSync(userData.password);
    }

    const user = await this.userRepository.updateById(userId, userData);
    return user;
  }

  async deleteUserById(userId: number) {
    await this.userRepository.deleteById(userId);
  }

  async getUsersByRole(role: string) {
    const users = await this.userRepository.findByRole(role);
    return users;
  }

  async getUserWithEquipments(userId: number) {
    const user = await this.userRepository.findByIdWithIncludes(userId, [
      {
        model: Equipment,
        as: "equipments",
      },
    ]);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }
}

export default UserService;
