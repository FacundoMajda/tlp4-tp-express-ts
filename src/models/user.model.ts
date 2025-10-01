import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../core/config/db";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public mobile!: string;
  public role!: "admin" | "user";
  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "user"]],
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default User;
