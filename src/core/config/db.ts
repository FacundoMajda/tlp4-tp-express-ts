import { Sequelize } from "sequelize";
import { environment } from "./environment";

const config = environment.db;

const sequelizeConnection = new Sequelize(
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

const dbSync = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log("Conexión a la base de datos establecida correctamente");
    await sequelizeConnection.sync({ alter: true, force: false });
    console.log("Base de datos sincronizada correctamente");
    return { success: true };
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
};

export { dbSync };
export default sequelizeConnection;
