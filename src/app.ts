import { boostrap } from "./core/bootstrap";
import appRouter from "./routes";
import setupAssociations from "./models/associations";
import { dbSync } from "./core/config/db";

async function main() {
  try {
    setupAssociations();
    await dbSync();
    await boostrap(appRouter);
  } catch (error) {
    console.error("Error al inicializar el servidor:", error);
    process.exit(1);
  }
}
main();
