import type { AccessTokenPayload, RefreshTokenPayload } from "../types/authTypes.js";
export declare const hashToken: (token: string) => string;
export declare const signAccessToken: (payload: AccessTokenPayload) => string;
export declare const verifyAccessToken: (token: string) => AccessTokenPayload;
export declare const signRefreshToken: (payload: RefreshTokenPayload) => string;
export declare const verifyRefreshToken: (token: string) => RefreshTokenPayload;
export declare const safeVerifyRefreshToken: (token: string) => RefreshTokenPayload | null;
//# sourceMappingURL=jwt.d.ts.map