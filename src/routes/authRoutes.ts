import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserRepository } from "../repositories/user.repository";
import UserService from "../services/user.service";
import isAuth from "../middlewares/isAuth";
import {
  validateUserRegister,
  validateUserLogin,
} from "../middlewares/validation.middleware";

const authRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

authRouter.post("/login", validateUserLogin, (req, res) =>
  authController.login(req, res)
);
authRouter.post("/register", validateUserRegister, (req, res) =>
  authController.register(req, res)
);
authRouter.post("/logout", isAuth, (req, res) =>
  authController.logout(req, res)
);

export { authRouter };
