import {} from "express";
const VALID_API_KEY = process.env.API_KEY || "test-api-key-123";
export const apiKeyCheck = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        res.status(401).json({
            success: false,
            error: "API anahtarı gerekli",
            code: "MISSING_API_KEY",
        });
        return;
    }
    if (apiKey !== VALID_API_KEY) {
        res.status(401).json({
            success: false,
            error: "Geçersiz API anahtarı",
            code: "INVALID_API_KEY",
        });
        return;
    }
    next();
};
//# sourceMappingURL=apiKeyCheck.js.map