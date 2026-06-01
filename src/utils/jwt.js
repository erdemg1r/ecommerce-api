import crypto from "crypto";
import jwt, {} from "jsonwebtoken";
import { env } from "../config/env.js";
export const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};
export const signAccessToken = (payload) => {
    const options = {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    };
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
};
export const signRefreshToken = (payload) => {
    const options = {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    };
    return jwt.sign(payload, env.JWT_REFRESH_EXPIRES_IN, options);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, env.JWT_REFRESH_EXPIRES_IN);
};
export const safeVerifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=jwt.js.map