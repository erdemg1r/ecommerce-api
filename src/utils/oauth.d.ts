import { Google } from "arctic";
export declare const googleClient: Google;
export declare const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";
export interface GoogleUserInfo {
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
}
//# sourceMappingURL=oauth.d.ts.map