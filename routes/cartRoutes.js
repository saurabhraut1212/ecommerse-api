import express from "express";
import buyerProtect from "../middleware/buyerProtect.js";
import { addProductToCart, removeProductFromCart } from "../controllers/cartController.js";

const router = express.Router();
router.post("/cart", buyerProtect, addProductToCart);
router.delete("/cart/remove/:productId", buyerProtect, removeProductFromCart)

export default router;