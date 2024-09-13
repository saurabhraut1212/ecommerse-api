import { addToCart, removeFromCart } from "../models/Cart.js";


export const addProductToCart = async (req, res) => {
    try {
        const buyerId = req.user.userId;
        const { productId } = req.body;
        const cartItem = await addToCart(buyerId, productId);
        res.json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const removeProductFromCart = async (req, res) => {
    const { productId } = req.params;
    const buyerId = req.user.userId;

    try {
        const cartItem = await removeFromCart(productId, buyerId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        res.json({ message: 'Product removed from cart', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error: error.message });
    }
};