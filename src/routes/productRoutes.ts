import { Router, type Router as ExpressRouter } from "express";
import { productController } from "../controllers/productController.js";
import {
  validateBody,
  validateQuery,
  validateParams,
} from "../middlewares/validate.js";
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
  tagIdsSchema,
} from "../schemas/productSchemas.js";
import { idParamSchema } from "../schemas/commonSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

const router: ExpressRouter = Router();

// 1. Statik koleksiyon route'ları (dinamik /:id'den ÖNCE gelmeli)
router.get("/", validateQuery(productQuerySchema), productController.getAll);
router.get("/deleted", authenticate, productController.getDeleted);

// 2. Kaynak yaratma
router.post("/", authenticate, validateBody(createProductSchema), productController.create);

// 3. Dinamik route'lar (parametreli)
router.get("/:id", validateParams(idParamSchema), productController.getById);

router.put(
  "/:id", authenticate,
  validateParams(idParamSchema),
  validateBody(updateProductSchema),
  productController.update,
);

router.delete("/:id", authenticate, validateParams(idParamSchema), productController.remove);

router.patch(
  "/:id/restore", authenticate,
  validateParams(idParamSchema),
  productController.restore,
);

// 4. Alt kaynak route'ları (tag işlemleri)
router.post(
  "/:id/tags", authenticate,
  validateParams(idParamSchema),
  validateBody(tagIdsSchema),
  productController.addTags,
);

router.delete(
  "/:id/tags", authenticate,
  validateParams(idParamSchema),
  validateBody(tagIdsSchema),
  productController.removeTags,
);

router.put(
  "/:id/tags", authenticate,
  validateParams(idParamSchema),
  validateBody(tagIdsSchema),
  productController.setTags,
);

export default router;
