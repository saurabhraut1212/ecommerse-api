import express from "express";
import sellerProtect from "../middleware/sellerProtect.js";
import { addNewProduct, deleteExistingProduct, editExistingProduct, searchProductsByQuery } from "../controllers/productController.js";

const router = express.Router();

router.post("/products", sellerProtect, addNewProduct);
router.put("/products/:productId", sellerProtect, editExistingProduct);
router.delete("/products/:productId", sellerProtect, deleteExistingProduct);
router.get("/products", searchProductsByQuery)

export default router;