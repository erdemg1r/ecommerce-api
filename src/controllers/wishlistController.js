import { asyncHandler } from "../utils/asyncHandler.js";
import { wishlistService } from "../services/wishlistService.js";
import { sendList, sendNoContent, sendSuccess } from "../utils/response.js";
const list = asyncHandler(async (req, res) => {
    const items = await wishlistService.list(req.user.userId);
    sendList(res, items);
});
const add = asyncHandler(async (req, res) => {
    const item = await wishlistService.add(req.user.userId, req.params.productId);
    sendSuccess(res, item, 201);
});
const remove = asyncHandler(async (req, res) => {
    await wishlistService.remove(req.user.userId, req.params.productId);
    sendNoContent(res);
});
export const wishlistController = { list, add, remove };
//# sourceMappingURL=wishlistController.js.map