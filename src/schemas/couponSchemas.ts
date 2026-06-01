import { z } from "zod/v4";

export const createCouponSchema = z
  .object({
    code: z
      .string({ error: "Kupon kodu metin olmalıdır" })
      .trim()
      .min(3, "Kupon kodu en az 3 karakter olmalıdır")
      .max(20, "Kupon kodu en fazla 20 karakter olabilir")
      .transform((val) => val.toUpperCase()),
    discountType: z.enum(["PERCENTAGE", "FIXED"]),
    discountValue: z
      .number({ error: "İndirim değeri sayı olmalıdır" })
      .int("İndirim değeri tam sayı olmalıdır")
      .positive("İndirim değeri 0'dan büyük olmalıdır"),
    minOrderAmount: z
      .number({ error: "Minimum sipariş tutarı sayı olmalıdır" })
      .int("Minimum sipariş tutarı tam sayı olmalıdır")
      .nonnegative("Minimum sipariş tutarı negatif olamaz")
      .default(0),
    maxUsage: z
      .number({ error: "Maksimum kullanım sayısı sayı olmalıdır" })
      .int("Maksimum kullanım sayısı tam sayı olmalıdır")
      .positive("Maksimum kullanım sayısı pozitif olmalıdır")
      .optional()
      .nullable(),
    expiresAt: z.coerce
      .date({ error: "Geçersiz tarih formatı" })
      .refine((date) => date > new Date(), {
        message: "Son kullanma tarihi gelecekte olmalıdır",
      })
      .optional()
      .nullable(),
    isActive: z.boolean().default(true),
  })
  .refine(
    (data) => {
      if (data.discountType === "PERCENTAGE") {
        return data.discountValue >= 1 && data.discountValue <= 100;
      }
      return true;
    },
    {
      message: "Yüzdelik indirim değeri 1 ile 100 arasında olmalıdır",
      path: ["discountValue"],
    }
  );

export const updateCouponSchema = createCouponSchema.partial();

export const validateCouponSchema = z.object({
  code: z
    .string({ error: "Kupon kodu zorunludur" })
    .trim()
    .min(1, "Kupon kodu boş olamaz")
    .transform((val) => val.toUpperCase()),
  orderAmount: z
    .number({ error: "Sipariş tutarı sayı olmalıdır" })
    .int("Sipariş tutarı tam sayı olmalıdır (kuruş)")
    .positive("Sipariş tutarı 0'dan büyük olmalıdır"),
});

export type CreateCouponInput = z.infer<typeof createCouponSchema>;
export type UpdateCouponInput = z.infer<typeof updateCouponSchema>;
export type ValidateCouponInput = z.infer<typeof validateCouponSchema>;
