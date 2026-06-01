import { z } from "zod/v4";
import { ValidationError } from "../utils/errors.js";
export const validateBody = (schema) => {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const fieldErrors = z.flattenError(result.error).fieldErrors;
            throw new ValidationError("Gönderilen Veriler Geçersiz", fieldErrors);
        }
        req.body = result.data;
        next();
    };
};
export const validateQuery = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            const fieldErrors = z.flattenError(result.error).fieldErrors;
            throw new ValidationError("Gönderilen sorgu parametreleri Geçersiz", fieldErrors);
        }
        // Express 5'te req.query salt-okunur — doğrulanmış veriyi res.locals'a koyuyoruz
        res.locals.query = result.data;
        next();
    };
};
export const validateParams = (schema) => {
    return (req, _res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            const fieldErrors = z.flattenError(result.error).fieldErrors;
            throw new ValidationError("Gönderilen URL parametreleri Geçersiz", fieldErrors);
        }
        req.params = result.data;
        next();
    };
};
//# sourceMappingURL=validate.js.map