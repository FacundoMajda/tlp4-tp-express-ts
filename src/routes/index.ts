import { Router } from "express";
import { authRouter } from "./authRoutes";
import { equipmentRouter } from "./equipmentRoutes";
import { userRouter } from "./userRoutes";

const appRouter = Router();

const appRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/equipment",
    router: equipmentRouter,
  },
  {
    path: "/users",
    router: userRouter,
  },
];

appRoutes.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
