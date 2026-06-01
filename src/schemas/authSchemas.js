import z from "zod/v4";
import { nameSchema } from "./commonSchemas.js";
export const registerSchema = z
    .object({
    email: z
        .string({ error: "Email metin olmalıdır" })
        .trim()
        .toLowerCase()
        .email("Geçerli bir email adresi girin"),
    password: z
        .string({ error: "Şifre metin olmalıdır" })
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .max(100, "Şifre en fazla 100 karakter olabilir")
        .regex(/[A-Z]/, "En az bir büyük harf içermelidir")
        .regex(/[a-z]/, "En az bir küçük harf içermelidir")
        .regex(/[0-9]/, "En az bir rakam içermelidir"),
    confirmPassword: z.string(),
    name: nameSchema(100),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
});
export const verifyEmailSchema = z.object({
    token: z.string().length(64, "Geçersiz doğrulama token'ı"),
});
export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Geçerli email girin"),
    password: z.string().min(1, "Şifre gereklidir"),
});
export const forgotPasswordSchema = z.object({
    email: z.string().trim().toLowerCase().email("Geçerli Email Adresi Girin")
});
export const resetPasswordSchme = z.object({
    token: z.string().length(64, "Geçersiz Token"),
    password: z
        .string({ error: "Şifre metin olmalıdır" })
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .max(100, "Şifre en fazla 100 karakter olabilir")
        .regex(/[A-Z]/, "En az bir büyük harf içermelidir")
        .regex(/[a-z]/, "En az bir küçük harf içermelidir")
        .regex(/[0-9]/, "En az bir rakam içermelidir"),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
});
export const resendVerificationSchema = z.object({
    email: z.string().trim().toLowerCase().email(),
});
//# sourceMappingURL=authSchemas.js.map