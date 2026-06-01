export function sendSuccess(res, data, statusCode = 200) {
    const body = { success: true, data };
    res.status(statusCode).json(body);
}
export function sendList(res, data, meta) {
    const body = { success: true, data };
    if (meta) {
        const totalPages = Math.ceil(meta.total / meta.limit);
        body.meta = {
            ...meta,
            totalPages,
            hasNext: meta.page < totalPages,
            hasPrev: meta.page > 1,
        };
    }
    res.json(body);
}
export function sendNoContent(res) {
    res.status(204).send();
}
//# sourceMappingURL=response.js.map