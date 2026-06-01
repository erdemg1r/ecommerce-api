import { z } from "zod/v4";
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export type IdParam = z.infer<typeof idParamSchema>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export declare const nameSchema: (maxLength?: number) => z.ZodString;
export declare const slugSchema: z.ZodOptional<z.ZodString>;
export declare const idAndImageIdParamSchema: z.ZodObject<{
    id: z.ZodString;
    imageId: z.ZodString;
}, z.core.$strip>;
export declare const cursorPaginationSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
//# sourceMappingURL=commonSchemas.d.ts.map