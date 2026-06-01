import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { validateBody, validateQuery, validateParams, } from "../middlewares/validate.js";
import { createProductSchema, updateProductSchema, productQuerySchema, tagIdsSchema, } from "../schemas/productSchemas.js";
import { idAndImageIdParamSchema, idParamSchema } from "../schemas/commonSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { checkOwnership } from "../middlewares/checkOwnerShip.js";
import { uploadProductImage } from "../middlewares/upload.js";
const router = Router();
// 1. Statik koleksiyon route'ları (dinamik /:id'den ÖNCE gelmeli)
router.get("/", validateQuery(productQuerySchema), productController.getAll);
router.get("/search", productController.search);
router.get("/deleted", authenticate, authorize("ADMIN"), productController.getDeleted);
// 2. Kaynak yaratma
router.post("/", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateBody(createProductSchema), productController.create);
// 3. Dinamik route'lar (parametreli)
router.get("/:id", validateParams(idParamSchema), productController.getById);
router.put("/:id", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateParams(idParamSchema), validateBody(updateProductSchema), productController.update);
router.delete("/:id", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateParams(idParamSchema), productController.remove);
router.patch("/:id/restore", authenticate, authorize("ADMIN"), validateParams(idParamSchema), productController.restore);
// 4. Alt kaynak route'ları (tag işlemleri)
router.post("/:id/tags", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateParams(idParamSchema), validateBody(tagIdsSchema), productController.addTags);
router.delete("/:id/tags", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateParams(idParamSchema), validateBody(tagIdsSchema), productController.removeTags);
router.put("/:id/tags", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateParams(idParamSchema), validateBody(tagIdsSchema), productController.setTags);
router.post("/:id/image", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateParams(idParamSchema), uploadProductImage.single("image"), productController.uploadImage);
router.post("/:id/images", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateParams(idParamSchema), uploadProductImage.array("image", 5), productController.uploadGallery);
router.delete("/:id/images/:imageId", authenticate, authorize("ADMIN", "PRODUCER"), checkOwnership("product"), validateParams(idAndImageIdParamSchema), productController.removeImage);
export default router;
//# sourceMappingURL=productRoutes.js.map