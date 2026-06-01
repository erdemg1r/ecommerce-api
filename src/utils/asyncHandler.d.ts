import type { Request, Response, NextFunction, RequestHandler } from "express";
export declare const asyncHandler: (fn: (req: Request<any, any, any>, res: Response, next: NextFunction) => Promise<void>) => RequestHandler;
//# sourceMappingURL=asyncHandler.d.ts.map