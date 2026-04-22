import { Router, type Router as ExpressRouter } from "express";
import { categoryController } from "../controllers/categoryController.js";
import { validateBody, validateParams } from "../middlewares/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/categorySchemas.js";
import { idParamSchema } from "../schemas/commonSchemas.js";

const router: ExpressRouter = Router();

// 1. Statik koleksiyon route'ları (dinamik /:id'den ÖNCE gelmeli)
router.get("/", categoryController.getAll);
router.get("/deleted", categoryController.getDeleted);

// 2. Kaynak yaratma
router.post("/", validateBody(createCategorySchema), categoryController.create);

// 3. Dinamik route'lar
router.get("/:id", validateParams(idParamSchema), categoryController.getById);

router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateCategorySchema),
  categoryController.update,
);

router.delete("/:id", validateParams(idParamSchema), categoryController.remove);

router.patch(
  "/:id/restore",
  validateParams(idParamSchema),
  categoryController.restore,
);

export default router;
