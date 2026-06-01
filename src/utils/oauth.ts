import { Google } from "arctic";
import { env } from "../config/env.js";


export const googleClient = new Google(
    env.GOOGLE_OAUTH_CLIENT_ID,
    env.GOOGLE_OAUTH_CLIENT_SECRET,
    env.GOOGLE_OAUTH_REDIRECT_URL,
)

export const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

export interface GoogleUserInfo {
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
}