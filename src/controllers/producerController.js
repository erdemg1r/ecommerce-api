import { asyncHandler } from "../utils/asyncHandler.js";
import { producerService } from "../services/producerService.js";
import {} from "../types/controllerTypes.js";
import { sendSuccess, sendList, sendNoContent } from "../utils/response.js";
const getAll = asyncHandler(async (_req, res) => {
    const producers = await producerService.findAll();
    sendList(res, producers);
});
const getDeleted = asyncHandler(async (_req, res) => {
    const producers = await producerService.findDeleted();
    sendList(res, producers);
});
const getById = asyncHandler(async (req, res) => {
    const producer = await producerService.findById(req.params.id);
    sendSuccess(res, producer);
});
const create = asyncHandler(async (req, res) => {
    // req.body zaten validateBody tarafından doğrulanmış
    const producer = await producerService.create(req.body);
    sendSuccess(res, producer, 201);
});
const update = asyncHandler(async (req, res) => {
    const producer = await producerService.update(req.params.id, req.body);
    sendSuccess(res, producer);
});
const remove = asyncHandler(async (req, res) => {
    await producerService.remove(req.params.id);
    sendNoContent(res);
});
const restore = asyncHandler(async (req, res) => {
    const producer = await producerService.restore(req.params.id);
    sendSuccess(res, producer);
});
export const producerController = {
    getAll,
    getDeleted,
    getById,
    create,
    update,
    remove,
    restore,
};
//# sourceMappingURL=producerController.js.map