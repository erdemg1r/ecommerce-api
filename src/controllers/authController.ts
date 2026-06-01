import type { Response, Request } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authService } from "../services/authService.js";
import { sendSuccess } from "../utils/response.js";
import type { ResendVerificationInput, VerifyEmailInput } from "../schemas/authSchemas.js";
import type { AuthController } from "../types/controllerTypes.js";
import { clearRefreshCookie, COOKIE_NAME, setRefreshCookie } from "../utils/cookies.js";
import { UnauthorizedError } from "../utils/errors.js";
import { generateCodeVerifier, generateState, OAuth2RequestError } from "arctic";
import { env } from "../config/env.js";
import { GOOGLE_USERINFO_URL, googleClient, type GoogleUserInfo } from "../utils/oauth.js";

const GOOGLE_STATE_COOKIE = "google_oauth_state";
const GOOGLE_VERIFIER_COOKIE = "google_oauth_code_verifier";
const OAUTH_COOKIE_TTL_MS = 10 * 60 * 1000;

const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  sendSuccess(
    res,
    {
      user,
      message:
        "Kayıt başarılı! Email adresinizi doğrulamak için linke tıklayın.",
    },
    201,
  );
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = res.locals.query as VerifyEmailInput;
  const result = await authService.verifyEmail(token);
  sendSuccess(res, result);
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await authService.login(req.body, {
    userAgent: req.get("user-agent") ?? undefined,
    ipAddress: req.ip
  });
  setRefreshCookie(res, refreshToken)
  sendSuccess(res, { user, accessToken });
});

const refresh = asyncHandler(async (req: Request, res: Response) => {
  const rawToken = req.cookies?.[COOKIE_NAME] as string | undefined
  if (!rawToken) {
    throw new UnauthorizedError("Refresh Token bulunamadı")
  }

  const { accessToken, refreshToken } = await authService.refresh(rawToken, {
    userAgent: req.get("user-agent") ?? undefined,
    ipAddress: req.ip
  })
  setRefreshCookie(res, refreshToken)
  sendSuccess(res, { accessToken })
})

const logout = asyncHandler(async (req: Request, res: Response) => {
  const rawToken = req.cookies?.[COOKIE_NAME] as string | undefined
  await authService.logout(rawToken)
  clearRefreshCookie(res)
  sendSuccess(res, { message: "Çıkış Başarılı!" })
})

const logoutAll = asyncHandler(async (req: Request, res: Response) => {
  await authService.logoutAll(req.user!.userId)
  clearRefreshCookie(res)
  sendSuccess(res, { message: "Tüm Cihazlardan Çıkış Başarılı!" })
})

const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.me(req.user!.userId)
  sendSuccess(res, { user })
})

const session = asyncHandler(async (req: Request, res: Response) => {
  const list = await authService.listSession(req.user!.userId)
  sendSuccess(res, { session: list })
})

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  sendSuccess(res, await authService.forgotPassword(req.body))
})

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  sendSuccess(res, await authService.resetPassword(req.body))
})

const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body as ResendVerificationInput;
  const result = await authService.resendVerification(email);
  sendSuccess(res, result);
});

const googleRedirect = asyncHandler(async (_req: Request, res: Response) => {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  res.cookie(GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OAUTH_COOKIE_TTL_MS,
    path: "/"
  })

  res.cookie(GOOGLE_VERIFIER_COOKIE, codeVerifier, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: OAUTH_COOKIE_TTL_MS,
    path: "/"
  })

  const url = googleClient.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email"
  ])

  res.redirect(url.toString())

})

const googleCallBack = asyncHandler(async (req: Request, res: Response) => {
  const code = req.query["code"] as string | undefined
  const state = req.query["state"] as string | undefined
  const storedState = req.cookies?.[GOOGLE_STATE_COOKIE] as string | undefined
  const storedCodeVerifier = req.cookies?.[GOOGLE_VERIFIER_COOKIE] as string | undefined

  if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier) {
    res.clearCookie(GOOGLE_STATE_COOKIE, { path: "/" })
    res.clearCookie(GOOGLE_VERIFIER_COOKIE, { path: "/" })
    return res.redirect(`${env.OAUTH_ERROR_REDIRECT}?reason=invalid_state`)
  }

  try {
    const tokens = await googleClient.validateAuthorizationCode(code, storedCodeVerifier)

    const accessToken = tokens.accessToken()

    const userinfoResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!userinfoResponse.ok) {
      res.clearCookie(GOOGLE_STATE_COOKIE, { path: "/" })
      res.clearCookie(GOOGLE_VERIFIER_COOKIE, { path: "/" })
      return res.redirect(`${env.OAUTH_ERROR_REDIRECT}?reason=userinfo_failed`)
    }

    const googleUser = (await userinfoResponse.json() as GoogleUserInfo)

    const result = await authService.handleOAuthLogin(
      {
        provider: "GOOGLE",
        providerUserId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        emailVerified: googleUser.email_verified
      },
      {
        userAgent: req.get("user-agent") ?? undefined,
        ipAddress: req.ip
      }
    )

    res.clearCookie(GOOGLE_STATE_COOKIE, { path: "/" })
    res.clearCookie(GOOGLE_VERIFIER_COOKIE, { path: "/" })

    setRefreshCookie(res, result.refreshToken)

    return res.redirect(`${env.OAUTH_SUCCESS_REDIRECT}?token=${result.accessToken}`)
  } catch (err) {
    if (err instanceof OAuth2RequestError) {
      res.clearCookie(GOOGLE_STATE_COOKIE, { path: "/" })
      res.clearCookie(GOOGLE_VERIFIER_COOKIE, { path: "/" })
      return res.redirect(`${env.OAUTH_ERROR_REDIRECT}?reason=oauth_denied`)
    }
    throw err
  }

})

export const authController: AuthController = {
  register,
  verifyEmail,
  login,
  refresh,
  logout,
  logoutAll,
  me,
  session,
  forgotPassword,
  resetPassword,
  resendVerification,
  googleCallBack,
  googleRedirect,
}