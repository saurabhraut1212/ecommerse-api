import pool from "../config/db.js";

export const addProduct = async (name, category, description, price, discount, sellerId) => {
    const result = await pool.query(
        `INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, category, description, price, discount, sellerId]
    );
    return result.rows[0];
};

export const editProduct = async (productId, { name, category, description, price, discount, sellerId }) => {
    const result = await pool.query(
        `UPDATE products 
     SET name = $1, category = $2, description = $3, price = $4, discount = $5
     WHERE id = $6 AND seller_id = $7
     RETURNING *`,
        [name, category, description, price, discount, productId, sellerId]
    );
    return result.rows[0];
};


export const deleteProduct = async (productId, sellerId) => {
    const result = await pool.query(
        `DELETE FROM products 
     WHERE id = $1 AND seller_id = $2
     RETURNING *`,
        [productId, sellerId]
    );
    return result.rows[0];
};

export const searchProducts = async (name, category) => {
    let query = 'SELECT * FROM products WHERE 1 = 1';
    const params = [];


    if (name) {
        query += ` AND name ILIKE $${params.length + 1}`;
        params.push(`%${name}%`);
    }


    if (category) {
        query += ` AND category ILIKE $${params.length + 1}`;
        params.push(`%${category}%`);
    }

    const result = await pool.query(query, params);
    return result.rows;
};