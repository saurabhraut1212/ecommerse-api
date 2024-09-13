import express from "express";
import sellerProtect from "../middleware/sellerProtect.js";
import { addNewProduct, createOrder, deleteExistingProduct, editExistingProduct, searchProductsByQuery, viewSellerOrders } from "../controllers/productController.js";
import buyerProtect from "../middleware/buyerProtect.js";

const router = express.Router();

router.post("/products", sellerProtect, addNewProduct);
router.put("/products/:productId", sellerProtect, editExistingProduct);
router.delete("/products/:productId", sellerProtect, deleteExistingProduct);
router.get("/products", searchProductsByQuery);

router.post("/orders", buyerProtect, createOrder);
router.get("/seller/orders", sellerProtect, viewSellerOrders);

export default router;