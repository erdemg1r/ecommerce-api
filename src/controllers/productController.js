import {} from "express";
import { productService } from "../services/productService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {} from "../types/controllerTypes.js";
import { sendSuccess, sendList, sendNoContent } from "../utils/response.js";
import { ValidationError } from "../utils/errors.js";
import { productImageService } from "../services/productImageService.js";
const getAll = asyncHandler(async (_req, res) => {
    const filters = res.locals.query;
    if (filters.cursor !== undefined) {
        const { data, meta } = await productService.findAllWithCursor(filters);
        res.json({
            success: true, data, meta
        });
        return;
    }
    const { data, meta } = await productService.findAll(filters);
    sendList(res, data, {
        page: meta.page,
        limit: meta.limit,
        total: meta.total,
    });
});
const getDeleted = asyncHandler(async (_req, res) => {
    const products = await productService.findDeleted();
    sendList(res, products);
});
const getById = asyncHandler(async (req, res) => {
    const product = await productService.findById(req.params.id);
    sendSuccess(res, product);
});
const create = asyncHandler(async (req, res) => {
    // req.body zaten doğrulanmış ve dönüştürülmüş — güvenle kullan
    const product = await productService.create({ ...req.body, ownerId: req.user.userId });
    sendSuccess(res, product, 201);
});
const update = asyncHandler(async (req, res) => {
    const product = await productService.update(req.params.id, req.body);
    sendSuccess(res, product);
});
const remove = asyncHandler(async (req, res) => {
    await productService.remove(req.params.id);
    sendNoContent(res);
});
const restore = asyncHandler(async (req, res) => {
    const product = await productService.restore(req.params.id);
    sendSuccess(res, product);
});
const addTags = asyncHandler(async (req, res) => {
    const product = await productService.addTags(req.params.id, req.body.tagIds);
    sendSuccess(res, product);
});
const removeTags = asyncHandler(async (req, res) => {
    const product = await productService.removeTags(req.params.id, req.body.tagIds);
    sendSuccess(res, product);
});
const setTags = asyncHandler(async (req, res) => {
    const product = await productService.setTags(req.params.id, req.body.tagIds);
    sendSuccess(res, product);
});
const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ValidationError("Dosya Zorunlu", {
            file: ["Image alanı bir dosya içermeli"]
        });
    }
    const imageUrl = `/uploads/products/${req.file.filename}`;
    const product = await productService.setImage(req.params.id, imageUrl);
    sendSuccess(res, product);
});
const uploadGallery = asyncHandler(async (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        throw new ValidationError("En az 1 dosya zorunlu", {
            iamges: ["images alanı en az 1 dosya içermeli"]
        });
    }
    const created = await productImageService.addMany(req.params.id, files);
    sendSuccess(res, created, 201);
});
const removeImage = asyncHandler(async (req, res) => {
    await productImageService.remove(req.params.id, req.params.imageId);
    sendNoContent(res);
});
const search = asyncHandler(async (req, res) => {
    const q = String(req.query["q"] ?? "").trim();
    const page = Math.max(1, Number(req.query["page"] ?? 1));
    const limit = Math.min(100, Math.max(1, Number(req.query["limit"] ?? 20)));
    if (q.length < 2) {
        throw new ValidationError("Arama sorgusu en az 2 karakter olmalı", {
            q: ["q parametresi zorunlu, minimum 2 karakter"]
        });
    }
    const { data, total } = await productService.search(q, page, limit);
    sendList(res, data, { page, limit, total });
});
export const productController = {
    getAll,
    getDeleted,
    getById,
    create,
    update,
    remove,
    restore,
    addTags,
    removeTags,
    setTags,
    uploadImage,
    uploadGallery,
    removeImage,
    search
};
//# sourceMappingURL=productController.js.map