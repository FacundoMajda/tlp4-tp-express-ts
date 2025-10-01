import { Router } from "express";
import { UserController } from "../controllers/UserController";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import {
  validateUserUpdate,
  validateUserRegister,
} from "../middlewares/validation.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  userController.getUsers.bind(userController)
);

userRouter.get("/:id", isAuth, userController.getUserById.bind(userController));

userRouter.put(
  "/:id",
  isAuth,
  validateUserUpdate,
  userController.updateUser.bind(userController)
);
userRouter.post(
  "/",
  isAuth,
  isAdmin,
  validateUserRegister,
  userController.createUser.bind(userController)
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  userController.deleteUser.bind(userController)
);

export { userRouter };
