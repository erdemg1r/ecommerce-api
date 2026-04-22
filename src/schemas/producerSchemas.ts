import { z } from "zod/v4";
import { nameSchema } from "./commonSchemas.js";

export const createProducerSchema = z.object({
  name: nameSchema(100),

  city: z.string().trim().min(2, "Şehir adı en az 2 karakter olmalıdır")
    .max(100, "Şehir adı en fazla 100 karakter olabilir").optional(),
});

export type CreateProducerInput = z.infer<typeof createProducerSchema>;

export const updateProducerSchema = createProducerSchema.partial();

export type UpdateProducerInput = z.infer<typeof updateProducerSchema>;
