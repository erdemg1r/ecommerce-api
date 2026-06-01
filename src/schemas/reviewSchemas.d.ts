import { z } from "zod/v4";
export declare const upsertReviewSchema: z.ZodObject<{
    rating: z.ZodNumber;
    comment: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpsertReviewInput = z.infer<typeof upsertReviewSchema>;
export declare const reviewListQuerySchema: z.ZodObject<{
    cursor: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string | undefined, string | undefined>>;
    limit: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type ReviewListQuery = z.infer<typeof reviewListQuerySchema>;
export declare const productIdParamSchema: z.ZodObject<{
    productId: z.ZodString;
}, z.core.$strip>;
export type ProductIdParam = z.infer<typeof productIdParamSchema>;
//# sourceMappingURL=reviewSchemas.d.ts.map