import { Router, type Router as ExpressRouter } from "express";
import { producerController } from "../controllers/producerController.js";
import { validateBody, validateParams } from "../middlewares/validate.js";
import {
  createProducerSchema,
  updateProducerSchema,
} from "../schemas/producerSchemas.js";
import { idParamSchema } from "../schemas/commonSchemas.js";

const router: ExpressRouter = Router();

// 1. Statik koleksiyon route'ları
router.get("/", producerController.getAll);
router.get("/deleted", producerController.getDeleted);

// 2. Kaynak yaratma
router.post("/", validateBody(createProducerSchema), producerController.create);

// 3. Dinamik route'lar
router.get("/:id", validateParams(idParamSchema), producerController.getById);

router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateProducerSchema),
  producerController.update,
);

router.delete("/:id", validateParams(idParamSchema), producerController.remove);

router.patch(
  "/:id/restore",
  validateParams(idParamSchema),
  producerController.restore,
);

export default router;
