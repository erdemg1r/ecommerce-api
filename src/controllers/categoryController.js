import {} from "express";
import { categoryService } from "../services/categoryService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {} from "../types/controllerTypes.js";
import { sendSuccess, sendList, sendNoContent } from "../utils/response.js";
const getAll = asyncHandler(async (_req, res) => {
    const categories = await categoryService.findAll();
    sendList(res, categories);
});
const getDeleted = asyncHandler(async (_req, res) => {
    const categories = await categoryService.findDeleted();
    sendList(res, categories);
});
const getById = asyncHandler(async (req, res) => {
    const category = await categoryService.findById(req.params.id);
    sendSuccess(res, category);
});
const create = asyncHandler(async (req, res) => {
    // req.body zaten validateBody tarafından doğrulanmış
    const category = await categoryService.create(req.body);
    sendSuccess(res, category, 201);
});
const update = asyncHandler(async (req, res) => {
    const category = await categoryService.update(req.params.id, req.body);
    sendSuccess(res, category);
});
const remove = asyncHandler(async (req, res) => {
    await categoryService.remove(req.params.id);
    sendNoContent(res);
});
const restore = asyncHandler(async (req, res) => {
    const category = await categoryService.restore(req.params.id);
    sendSuccess(res, category);
});
export const categoryController = {
    getAll,
    getDeleted,
    getById,
    create,
    update,
    remove,
    restore,
};
//# sourceMappingURL=categoryController.js.map