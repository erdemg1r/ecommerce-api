export function encodeCursor(c) {
    return Buffer.from(JSON.stringify(c), "utf-8").toString("base64url");
}
export function decodeCursor(token) {
    try {
        const json = Buffer.from(token, "base64url").toString("utf-8");
        const parsed = JSON.parse(json);
        if (typeof parsed?.createdAt === "string" &&
            typeof parsed?.id === "string") {
            return parsed;
        }
        return null;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=cursor.js.map