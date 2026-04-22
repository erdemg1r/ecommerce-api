import { type Request, type Response } from "express";
import { tagService } from "../services/tagService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { type CrudController } from "../types/controllerTypes.js";
import { sendSuccess, sendList, sendNoContent } from "../utils/response.js";

const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const tags = await tagService.findAll();
  sendList(res, tags);
});

const getDeleted = asyncHandler(async (_req: Request, res: Response) => {
  const tags = await tagService.findDeleted();
  sendList(res, tags);
});

const getById = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const tag = await tagService.findById(req.params.id);
  sendSuccess(res, tag);
});

const create = asyncHandler(async (req: Request, res: Response) => {
  // req.body zaten validateBody tarafından doğrulanmış
  const tag = await tagService.create(req.body);
  sendSuccess(res, tag, 201);
});

const update = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const tag = await tagService.update(req.params.id, req.body);
  sendSuccess(res, tag);
});

const remove = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  await tagService.remove(req.params.id);
  sendNoContent(res);
});

const restore = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const tag = await tagService.restore(req.params.id);
  sendSuccess(res, tag);
});

export const tagController: CrudController = {
  getAll,
  getDeleted,
  getById,
  create,
  update,
  remove,
  restore,
};
