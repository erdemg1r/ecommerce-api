import type { RequestHandler } from "express";
import type { Role } from "../generated/prisma/client.js";
export declare const authorize: (...allowedRoles: Role[]) => RequestHandler;
//# sourceMappingURL=authorize.d.ts.map