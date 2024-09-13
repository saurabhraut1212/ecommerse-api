import pool from "../config/db.js";

export const addToCart = async (buyerId, productId) => {
    console.log(buyerId, "buyerid");
    console.log(productId, "productId");

    try {
        if (!buyerId || !productId) {
            throw new Error("buyerId and productId are required");
        }


        const productCheck = await pool.query(
            `SELECT * FROM products WHERE id = $1`,
            [productId]
        );

        if (productCheck.rows.length === 0) {
            throw new Error("Product does not exist");
        }


        const result = await pool.query(
            `INSERT INTO cart (buyer_id, product_id) VALUES ($1, $2) RETURNING *`,
            [buyerId, productId]
        );

        return result.rows[0];

    } catch (error) {
        console.error("Error in addToCart:", error.message);
        throw new Error("Could not add product to cart");
    }
};

export const removeFromCart = async (productId, buyerId) => {
    try {

        const cartItemCheck = await pool.query(
            `SELECT * FROM cart WHERE product_id = $1 AND buyer_id = $2`,
            [productId, buyerId]
        );

        if (cartItemCheck.rows.length === 0) {
            throw new Error("Product not found in your cart");
        }

        const result = await pool.query(
            `DELETE FROM cart WHERE product_id = $1 AND buyer_id = $2 RETURNING *`,
            [productId, buyerId]
        );

        return result.rows[0];
    } catch (error) {
        console.error("Error in removeFromCart:", error.message);
        throw new Error("Could not remove product from cart");
    }
};