import { Router } from "express";
import { EquipmentController } from "../controllers/EquipmentController";
import { EquipmentRepository } from "../repositories/equipment.repository";
import EquipmentService from "../services/equipment.service";
import isAdmin from "../middlewares/isAdmin";
import isAuth from "../middlewares/isAuth";
import { validateEquipment } from "../middlewares/validation.middleware";

const equipmentRouter = Router();
const equipmentRepository = new EquipmentRepository();
const equipmentService = new EquipmentService(equipmentRepository);
const equipmentController = new EquipmentController(equipmentService);

// NO TENGO USER EN REQ
equipmentRouter.get(
  "/",
  isAuth, // admin y user pueden ver ESTE ME AGREGA EL USUARIO EN REQ
  (req, res) => equipmentController.getEquipment(req, res)
);

equipmentRouter.get(
  "/:id",
  isAuth, // admin y user pueden ver
  (req, res) => equipmentController.getEquipmentById(req, res)
);

equipmentRouter.post(
  "/",
  isAuth,
  isAdmin, // Solo admin puede crear
  validateEquipment,
  (req, res) => equipmentController.createEquipment(req, res)
);

equipmentRouter.put("/:id", isAuth, validateEquipment, (req, res) =>
  equipmentController.updateEquipment(req, res)
);

equipmentRouter.delete(
  "/:id",
  isAuth,
  isAdmin, // Solo admin puede eliminar
  (req, res) => equipmentController.deleteEquipment(req, res)
);

export { equipmentRouter };
