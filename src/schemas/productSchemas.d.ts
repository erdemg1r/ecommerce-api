import z from "zod";
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    stock: z.ZodDefault<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodString>;
    producerId: z.ZodOptional<z.ZodString>;
    tagIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    price: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    producerId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tagIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.z.core.$strip>;
export declare const productQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.z.ZodCoercedNumber<unknown>>;
    tagIds: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<string[] | undefined, string | undefined>>, z.ZodOptional<z.ZodArray<z.ZodString>>>;
    search: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    producerId: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.z.ZodCoercedNumber<unknown>>;
    maxPrice: z.ZodOptional<z.z.ZodCoercedNumber<unknown>>;
    sort: z.ZodDefault<z.ZodEnum<{
        name: "name";
        createdAt: "createdAt";
        price: "price";
        stock: "stock";
        updateAt: "updateAt";
    }>>;
    order: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    cursor: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
export declare const tagIdsSchema: z.ZodObject<{
    tagIds: z.ZodArray<z.ZodString>;
}, z.z.core.$strip>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type TagIdsInput = z.infer<typeof tagIdsSchema>;
//# sourceMappingURL=productSchemas.d.ts.map