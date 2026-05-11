import rateLimit from "express-rate-limit";


export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false, error: "Çok fazla başarısız deneme, 15 dakika sonra tekrar deneyin"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true
})

export const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false, error: "Çok fazla istek, 1 saat sonra tekrar deneyin"
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false, error: "Çok fazla kayıt denemesi, daha sonra tekrar deneyin"
  },
  standardHeaders: true,
  legacyHeaders: false,
})


export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    success: false, error: "Çok fazla istek, biraz bekleyin"
  },
  standardHeaders: true,
  legacyHeaders: false,
})
