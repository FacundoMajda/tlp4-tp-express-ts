import { Router } from "express";
import { EquipmentController } from "../controllers/EquipmentController";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
import { validateEquipment } from "../middlewares/validation.middleware";

const equipmentRouter = Router();
const equipmentController = new EquipmentController();

equipmentRouter.get(
  "/",
  isAuth, // admin y user pueden ver
  equipmentController.getEquipment.bind(equipmentController)
);

equipmentRouter.get(
  "/:id",
  isAuth, // admin y user pueden ver
  equipmentController.getEquipmentById.bind(equipmentController)
);

equipmentRouter.post(
  "/",
  isAuth,
  isAdmin, // Solo admin puede crear
  validateEquipment,
  equipmentController.createEquipment.bind(equipmentController)
);

equipmentRouter.put(
  "/:id",
  isAuth,
  validateEquipment,
  equipmentController.updateEquipment.bind(equipmentController)
);

equipmentRouter.delete(
  "/:id",
  isAuth,
  isAdmin, // Solo admin puede eliminar
  equipmentController.deleteEquipment.bind(equipmentController)
);

export { equipmentRouter };
