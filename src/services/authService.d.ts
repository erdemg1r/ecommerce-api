import type { Provider, Role } from "../generated/prisma/client.js";
import type { ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput } from "../schemas/authSchemas.js";
import type { SessionContext } from "../types/authTypes.js";
export declare const authService: {
    register: (input: RegisterInput) => Promise<{
        id: string;
        email: string;
        name: string;
        role: Role;
        isVerified: boolean;
        createdAt: Date;
    }>;
    verifyEmail: (rawToken: string) => Promise<{
        verified: boolean;
    }>;
    login: (input: LoginInput, session: SessionContext) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: Role;
        };
    }>;
    refresh: (rawToken: string, session: SessionContext) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout: (rawRefreshToken?: string) => Promise<void>;
    logoutAll: (userId: string) => Promise<void>;
    me: (userId: string) => Promise<{
        id: string;
        email: string;
        name: string;
        role: Role;
        isActive: boolean;
        isVerified: boolean;
        createdAt: Date;
    }>;
    listSession: (userId: string) => Promise<{
        id: string;
        createdAt: Date;
        expiresAt: Date;
        userAgent: string | null;
        ipAddress: string | null;
    }[]>;
    forgotPassword: (input: ForgotPasswordInput) => Promise<{
        message: string;
    }>;
    resetPassword: (input: ResetPasswordInput) => Promise<{
        message: string;
    }>;
    resendVerification: (email: string) => Promise<{
        message: string;
    }>;
    handleOAuthLogin: (input: {
        provider: Provider;
        providerUserId: string;
        email: string;
        name: string;
        emailVerified: boolean;
    }, session: SessionContext) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: Role;
        };
    }>;
};
//# sourceMappingURL=authService.d.ts.map