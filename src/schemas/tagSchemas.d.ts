import { z } from "zod/v4";
export declare const createTagSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type CreateTagInput = z.infer<typeof createTagSchema>;
export declare const updateTagSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
//# sourceMappingURL=tagSchemas.d.ts.map