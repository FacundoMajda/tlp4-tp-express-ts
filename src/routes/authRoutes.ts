import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import isAuth from "../middlewares/isAuth";
import {
  validateUserRegister,
  validateUserLogin,
} from "../middlewares/validation.middleware";

const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/login",
  validateUserLogin,
  authController.login.bind(authController)
);
authRouter.post(
  "/register",
  validateUserRegister,
  authController.register.bind(authController)
);
authRouter.post("/logout", isAuth, authController.logout.bind(authController));

export { authRouter };
