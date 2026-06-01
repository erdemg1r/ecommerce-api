import type { NextFunction, Request, Response } from "express";
import { type ZodType } from "zod/v4";
export declare const validateBody: (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const validateQuery: (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateParams: (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map