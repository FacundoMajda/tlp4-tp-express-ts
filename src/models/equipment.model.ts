import { DataTypes, Model } from "sequelize";
import { DatabaseConnection } from "../core/config/db";

class Equipment extends Model {
  public id!: number;
  public name!: string;
  public type!: string;
  public brand!: string;
  public model!: string;
  public serialNumber!: string;
  public status!: string;
  public location!: string;
  public purchaseDate!: Date;
  public warrantyExpiry!: Date;
  public notes!: string;
  public userId!: number;

  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Equipment.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["activo", "inactivo", "mantenimiento", "dado de baja"]],
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.DATE,
    },
    warrantyExpiry: {
      type: DataTypes.DATE,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize: DatabaseConnection.getInstance().getSequelize(),
    tableName: "equipment",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Equipment;
