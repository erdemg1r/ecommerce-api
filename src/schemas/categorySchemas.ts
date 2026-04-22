import { z } from "zod/v4";
import { nameSchema, slugSchema } from "./commonSchemas.js";

export const createCategorySchema = z.object({
  name: nameSchema(100),
  slug: slugSchema,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
