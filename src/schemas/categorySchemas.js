import { z } from "zod/v4";
import { nameSchema, slugSchema } from "./commonSchemas.js";
export const createCategorySchema = z.object({
    name: nameSchema(100),
    slug: slugSchema,
});
export const updateCategorySchema = createCategorySchema.partial();
//# sourceMappingURL=categorySchemas.js.map