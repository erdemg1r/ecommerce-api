import z from "zod/v4";
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
export declare const verifyEmailSchema: z.ZodObject<{
    token: z.ZodString;
}, z.core.$strip>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export declare const resetPasswordSchme: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchme>;
export declare const resendVerificationSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
//# sourceMappingURL=authSchemas.d.ts.map