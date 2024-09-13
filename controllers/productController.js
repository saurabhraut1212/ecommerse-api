import { addProduct, deleteProduct, editProduct, searchProducts } from "../models/Products.js";

export const addNewProduct = async (req, res) => {
    try {
        const { name, category, description, price, discount } = req.body;
        const sellerId = req.user.userId;
        const product = await addProduct(name, category, description, price, discount, sellerId);
        res.json({ message: 'Product added', product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }

};

export const editExistingProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.userId;

    try {

        const updatedProduct = await editProduct(productId, {
            name,
            category,
            description,
            price,
            discount,
            sellerId
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found or you are not authorized to edit this product' });
        }

        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

export const deleteExistingProduct = async (req, res) => {
    const { productId } = req.params;
    const sellerId = req.user.userId;

    try {

        const deletedProduct = await deleteProduct(productId, sellerId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found or you are not authorized to delete this product' });
        }

        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

export const searchProductsByQuery = async (req, res) => {
    const { name, category } = req.query;

    try {
        const products = await searchProducts(name, category);

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found matching the search criteria' });
        }

        res.json({ message: 'Products found', products });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};
