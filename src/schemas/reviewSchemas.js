import { z } from "zod/v4";
export const upsertReviewSchema = z.object({
    rating: z
        .number()
        .int("Puan tam sayı olmalı")
        .min(1, "Puan en az 1 olmalı")
        .max(5, "Puan en fazla 5 olmalı"),
    comment: z
        .string()
        .trim()
        .max(1000, "Yorum en fazla 1000 karakter olmalı")
        .optional(),
});
export const reviewListQuerySchema = z.object({
    cursor: z
        .string()
        .optional()
        .transform((value) => value || undefined),
    limit: z.number().int().min(1).max(100).default(20),
});
export const productIdParamSchema = z.object({
    productId: z.string().uuid("Geçersiz ürün ID formatı"),
});
//# sourceMappingURL=reviewSchemas.js.map