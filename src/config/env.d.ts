import "dotenv/config";
export declare const env: {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_EXPIRES_IN: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_FROM: string;
    FRONTEND_URL: string;
    GOOGLE_OAUTH_CLIENT_ID: string;
    GOOGLE_OAUTH_CLIENT_SECRET: string;
    GOOGLE_OAUTH_REDIRECT_URL: string;
    OAUTH_SUCCESS_REDIRECT: string;
    OAUTH_ERROR_REDIRECT: string;
    UPLOAD_MAX_SIZE_MB: number;
    UPLOAD_ALLOWED_TYPES: string[];
};
//# sourceMappingURL=env.d.ts.map