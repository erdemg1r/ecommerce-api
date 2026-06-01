import { z } from "zod/v4";
export declare const createProducerSchema: z.ZodObject<{
    name: z.ZodString;
    city: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateProducerInput = z.infer<typeof createProducerSchema>;
export declare const updateProducerSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type UpdateProducerInput = z.infer<typeof updateProducerSchema>;
//# sourceMappingURL=producerSchemas.d.ts.map