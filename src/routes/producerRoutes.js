import { Router } from "express";
import { producerController } from "../controllers/producerController.js";
import { validateBody, validateParams } from "../middlewares/validate.js";
import { createProducerSchema, updateProducerSchema, } from "../schemas/producerSchemas.js";
import { idParamSchema } from "../schemas/commonSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
const router = Router();
// 1. Statik koleksiyon route'ları
router.get("/", producerController.getAll);
router.get("/deleted", authenticate, authorize("ADMIN"), producerController.getDeleted);
// 2. Kaynak yaratma
router.post("/", authenticate, authorize("ADMIN"), validateBody(createProducerSchema), producerController.create);
// 3. Dinamik route'lar
router.get("/:id", validateParams(idParamSchema), producerController.getById);
router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validateBody(updateProducerSchema), producerController.update);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), producerController.remove);
router.patch("/:id/restore", authenticate, authorize("ADMIN"), validateParams(idParamSchema), producerController.restore);
export default router;
//# sourceMappingURL=producerRoutes.js.map