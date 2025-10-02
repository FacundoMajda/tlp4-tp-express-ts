import { Sequelize } from "sequelize";
import { environment } from "./environment";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private sequelize: Sequelize;

  private constructor() {
    const config = environment.db;

    this.sequelize = new Sequelize(
      config.dbname,
      config.username,
      config.password,
      {
        host: config.host,
        port: config.port,
        dialect: "mysql",
        logging: true,
      }
    );
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  public async sync(): Promise<{ success: boolean }> {
    try {
      await this.sequelize.authenticate();
      console.log("Conexión a la base de datos establecida correctamente");
      await this.sequelize.sync({ alter: true, force: false });
      console.log("Base de datos sincronizada correctamente");
      return { success: true };
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error;
    }
  }
}

export { DatabaseConnection };
