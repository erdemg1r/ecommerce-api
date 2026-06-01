export class AppError extends Error {
    statusCode;
    code;
    isOperational;
    constructor(message, statusCode, code = "APP-ERROR", isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
// 404 Kaynak Bulunamadı
export class NotFoundError extends AppError {
    constructor(resource = " Kaynak") {
        super(`${resource} bulunamadı`, 404, "NOT_FOUND");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
// 409 Çakışma
export class ConflictError extends AppError {
    constructor(message = "Bu kayıt zaten mevcut") {
        super(message, 409, "CONFLICT");
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
// 422 Validasyon HAtası
export class ValidationError extends AppError {
    details;
    constructor(message, details) {
        super(message, 422, "VALIDATION_ERROR");
        this.details = details;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
// 401 Yetkisiz Erişim
export class UnauthorizedError extends AppError {
    constructor(message = "Lütfen Giriş yapın") {
        super(message, 401, "UNAUTHORIZED");
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
// 403 Yasaklı Erişim
export class ForbiddenError extends AppError {
    constructor(message = "Yetkiniz Yok") {
        super(message, 403, "FORBIDDEN");
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
//# sourceMappingURL=errors.js.map