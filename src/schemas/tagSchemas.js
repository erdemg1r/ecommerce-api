import { z } from "zod/v4";
import { nameSchema } from "./commonSchemas.js";
export const createTagSchema = z.object({
    name: nameSchema(50),
});
export const updateTagSchema = createTagSchema.partial();
//# sourceMappingURL=tagSchemas.js.map