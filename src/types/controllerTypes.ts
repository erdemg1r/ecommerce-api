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
  uploadImage:RequestHandler;
  uploadGallery:RequestHandler;
  removeImage:RequestHandler;
  search:RequestHandler;
}

export interface AuthController {
  register: RequestHandler;
  verifyEmail: RequestHandler;
  login: RequestHandler,
  refresh: RequestHandler,
  logout: RequestHandler,
  logoutAll: RequestHandler,
  me: RequestHandler,
  session: RequestHandler,
  forgotPassword: RequestHandler,
  resetPassword: RequestHandler,
  resendVerification: RequestHandler,
  googleCallBack: RequestHandler,
  googleRedirect: RequestHandler,
}

export interface ReviewController {
  list: RequestHandler;
  stats: RequestHandler;
  upsert: RequestHandler;
  remove: RequestHandler;
}

export interface WishlistController {
  list: RequestHandler;
  add: RequestHandler;
  remove: RequestHandler;
}