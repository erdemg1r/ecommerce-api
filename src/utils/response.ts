import type { Response } from "express";
import type {
  PaginationMetaInput,
  SuccessResponse,
} from "../types/responseTypes.js";

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
): void {
  const body: SuccessResponse<T> = { success: true, data };
  res.status(statusCode).json(body);
}

export function sendList<T>(
  res: Response,
  data: T[],
  meta?: PaginationMetaInput,
): void {
  const body: SuccessResponse<T[]> = { success: true, data };

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

export function sendNoContent(res: Response): void {
  res.status(204).send();
}
