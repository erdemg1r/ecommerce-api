import { type Request, type Response } from "express";
import { couponService } from "../services/couponService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { type CouponController } from "../types/controllerTypes.js";
import { sendSuccess, sendList, sendNoContent } from "../utils/response.js";

const getAll = asyncHandler(async (_req: Request, res: Response) => {
  const coupons = await couponService.findAll();
  sendList(res, coupons);
});

const getById = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const coupon = await couponService.findById(req.params.id);
  sendSuccess(res, coupon);
});

const getByCode = asyncHandler(async (req: Request<{ code: string }>, res: Response) => {
  const coupon = await couponService.findByCode(req.params.code);
  sendSuccess(res, coupon);
});

const create = asyncHandler(async (req: Request, res: Response) => {
  const coupon = await couponService.create(req.body);
  sendSuccess(res, coupon, 201);
});

const update = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const coupon = await couponService.update(req.params.id, req.body);
  sendSuccess(res, coupon);
});

const remove = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  await couponService.remove(req.params.id);
  sendNoContent(res);
});

const validate = asyncHandler(async (req: Request, res: Response) => {
  const { code, orderAmount } = req.body;
  const result = await couponService.validateCoupon(code, orderAmount);
  sendSuccess(res, result);
});

export const couponController: CouponController = {
  getAll,
  getById,
  getByCode,
  create,
  update,
  remove,
  validate,
};
