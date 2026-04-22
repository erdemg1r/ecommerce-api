import { z } from "zod/v4";
import { nameSchema } from "./commonSchemas.js";

export const createTagSchema = z.object({
  name: nameSchema(50),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;

export const updateTagSchema = createTagSchema.partial();

export type UpdateTagInput = z.infer<typeof updateTagSchema>;
