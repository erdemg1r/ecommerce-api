import { Router, type Router as ExpressRouter } from "express";
import { validateBody, validateQuery } from "../middlewares/validate.js";
import { forgotPasswordSchema, loginSchema, registerSchema, resendVerificationSchema, resetPasswordSchme, verifyEmailSchema } from "../schemas/authSchemas.js";
import { authController } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { forgotPasswordLimiter, loginRateLimiter, registerLimiter } from "../middlewares/rateLimiters.js";

const router: ExpressRouter = Router();

router.post("/register", registerLimiter, validateBody(registerSchema), authController.register);

router.get(
  "/verify-email",
  validateQuery(verifyEmailSchema),
  authController.verifyEmail,
);

router.post("/login", loginRateLimiter, validateBody(loginSchema), authController.login)

router.post("/refresh", authController.refresh)

router.post("/logout", authController.logout)

router.post("/logout-all", authenticate, authController.logoutAll)

router.post("/me", authenticate, authController.me)

router.post("/session", authenticate, authController.session)

router.post("/forgot-password", forgotPasswordLimiter, validateBody(forgotPasswordSchema), authController.forgotPassword)

router.post("/reset-password", validateBody(resetPasswordSchme), authController.resetPassword)

router.post(
  "/resend-verification",
  validateBody(resendVerificationSchema),
  authController.resendVerification,
);

router.get("/google", authController.googleRedirect)

router.get("/google/callback", authController.googleCallBack)


export default router;