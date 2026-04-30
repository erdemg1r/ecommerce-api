import { type RequestHandler } from "express";

export interface CrudController {
  getAll: RequestHandler;
  getDeleted: RequestHandler;
  getById: RequestHandler;
  create: RequestHandler;
  update: RequestHandler;
  remove: RequestHandler;
  restore: RequestHandler;
}

export interface ProductController extends CrudController {
  addTags: RequestHandler;
  removeTags: RequestHandler;
  setTags: RequestHandler;
}

export interface AuthController {
  register: RequestHandler;
  verifyEmail: RequestHandler;
  login: RequestHandler,
  refresh: RequestHandler,
  logout:RequestHandler,
  logoutAll:RequestHandler,
  me:RequestHandler,
  session:RequestHandler,
}