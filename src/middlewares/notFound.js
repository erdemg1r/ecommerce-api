export const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: `${req.method} ${req.originalUrl} endpointi bulunamadı`,
            code: "ROUTE_NOT_FOUND",
        },
    });
};
//# sourceMappingURL=notFound.js.map