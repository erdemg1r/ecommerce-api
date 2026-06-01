import type { MailOptions } from "../types/authTypes.js";
export declare const sendMail: (opts: MailOptions) => Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
export declare const safeSendEmail: (opts: MailOptions) => Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo | null>;
//# sourceMappingURL=mailer.d.ts.map