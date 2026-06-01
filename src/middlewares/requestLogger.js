export const requestLogger = (req, res, next) => {
    const start = Date.now();
    console.log(`${req.method} ${req.originalUrl}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log(`Body ${JSON.stringify(req.body)}`);
    }
    res.on("finish", () => {
        const duration = Date.now() - start;
        const emoji = res.statusCode < 400 ? "✅" : "⚠️";
        console.log(`${emoji} ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
    });
    next();
};
//# sourceMappingURL=requestLogger.js.map