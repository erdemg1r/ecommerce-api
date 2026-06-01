import { Router, type Router as ExpressRouter } from "express";
import { couponController } from "../controllers/couponController.js";
import {
  validateBody,
  validateParams,
} from "../middlewares/validate.js";
import {
  createCouponSchema,
  updateCouponSchema,
  validateCouponSchema,
} from "../schemas/couponSchemas.js";
import { idParamSchema } from "../schemas/commonSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const router: ExpressRouter = Router();

// Tüm Coupon endpoints için authenticate gereklidir
router.use(authenticate);

// Kupon Doğrulama (Müşteri ve Admin kullanabilir)
router.post(
  "/validate",
  validateBody(validateCouponSchema),
  couponController.validate
);

// Kod ile kupon sorgulama (Müşteri ve Admin kullanabilir)
router.get(
  "/code/:code",
  couponController.getByCode
);

// Sadece Admin yetkisi gerektiren CRUD işlemleri
router.get(
  "/",
  authorize("ADMIN"),
  couponController.getAll
);

router.post(
  "/",
  authorize("ADMIN"),
  validateBody(createCouponSchema),
  couponController.create
);

router.get(
  "/:id",
  authorize("ADMIN"),
  validateParams(idParamSchema),
  couponController.getById
);

router.put(
  "/:id",
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validateBody(updateCouponSchema),
  couponController.update
);

router.delete(
  "/:id",
  authorize("ADMIN"),
  validateParams(idParamSchema),
  couponController.remove
);

export default router;
