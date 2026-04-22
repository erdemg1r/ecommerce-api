import { type Request, type Response } from "express";
import { productService } from "../services/productService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { type ProductController } from "../types/controllerTypes.js";
import type { ProductQuery } from "../schemas/productSchemas.js";
import { sendSuccess, sendList, sendNoContent } from "../utils/response.js";

const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const { data, meta } = await productService.findAll(
    res.locals.query as ProductQuery,
  );
  sendList(res, data, {
    page: meta.page,
    limit: meta.limit,
    total: meta.total,
  });
});

const getDeleted = asyncHandler(async (_req: Request, res: Response) => {
  const products = await productService.findDeleted();
  sendList(res, products);
});

const getById = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const product = await productService.findById(req.params.id);
  sendSuccess(res, product);
});

const create = asyncHandler(async (req: Request, res: Response) => {
  // req.body zaten doğrulanmış ve dönüştürülmüş — güvenle kullan
  const product = await productService.create(req.body);
  sendSuccess(res, product, 201);
});

const update = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const product = await productService.update(req.params.id, req.body);
  sendSuccess(res, product);
});

const remove = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  await productService.remove(req.params.id);
  sendNoContent(res);
});

const restore = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const product = await productService.restore(req.params.id);
  sendSuccess(res, product);
});

const addTags = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const product = await productService.addTags(
    req.params.id,
    req.body.tagIds,
  );
  sendSuccess(res, product);
});

const removeTags = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const product = await productService.removeTags(
    req.params.id,
    req.body.tagIds,
  );
  sendSuccess(res, product);
});

const setTags = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const product = await productService.setTags(
    req.params.id,
    req.body.tagIds,
  );
  sendSuccess(res, product);
});

export const productController: ProductController = {
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
};
