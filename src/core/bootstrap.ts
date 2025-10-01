import express from "express";
import morgan from "morgan";
import { environment } from "./config/environment";

async function boostrap(AppRouter: express.Router): Promise<express.Express> {
  const app = express();
  const PORT = environment.server.port;
  const HOST = environment.server.host;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use("/api", AppRouter);
  app.listen(PORT, async () => {
    console.log(`El servidor se está ejecutando en ${HOST}:${PORT}`);
  });
  return app;
}
export { boostrap };
