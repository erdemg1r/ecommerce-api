import { z } from "zod/v4";
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export declare const updateCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
//# sourceMappingURL=categorySchemas.d.ts.map