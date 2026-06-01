import { ForbiddenError, UnauthorizedError } from "../utils/errors.js";
export const authorize = (...allowedRoles) => {
    return (req, _res, next) => {
        if (!req.user) {
            throw new UnauthorizedError("Önce giriş yapmalısınız");
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new ForbiddenError("Bu işlem için yetkiniz yok");
        }
        next();
    };
};
//# sourceMappingURL=authorize.js.map