import type { Response } from "express";
import type { PaginationMetaInput } from "../types/responseTypes.js";
export declare function sendSuccess<T>(res: Response, data: T, statusCode?: number): void;
export declare function sendList<T>(res: Response, data: T[], meta?: PaginationMetaInput): void;
export declare function sendNoContent(res: Response): void;
//# sourceMappingURL=response.d.ts.map