import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/user.repository";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import {
  validateUserUpdate,
  validateUserRegister,
} from "../middlewares/validation.middleware";
import UserService from "../services/user.service";

const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/", isAuth, isAdmin, (req, res) =>
  userController.getUsers(req, res)
);

userRouter.get("/:id", isAuth, (req, res) =>
  userController.getUserById(req, res)
);

userRouter.put("/:id", isAuth, validateUserUpdate, (req, res) =>
  userController.updateUser(req, res)
);
userRouter.post("/", isAuth, isAdmin, validateUserRegister, (req, res) =>
  userController.createUser(req, res)
);

userRouter.delete("/:id", isAuth, isAdmin, (req, res) =>
  userController.deleteUser(req, res)
);

export { userRouter };
