import { Product } from '../models/product-model.js';
export const createProduct = async (req, res) => {
    try {
        const { name, price, seller, description, category } = req.body;
        const newProduct = await Product.create({ name, price, seller, description, category });
        res.status(201).send({ data: newProduct });
    } catch (e) {
        console.log(e.message);
        throw new Error("Product isn't created");
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).send('Products not found');
        }

        res.status(201).send({ data: products });
    } catch (e) {
        throw new Error("Couldn't find products");
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).send('Product not found');
            return;
        }
        res.status(201).send({ data: product });
    } catch (e) {
        console.log(e.message);
        throw new Error('Something went wrong');
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).send('Product not found');
            return;
        }
        res.status(201).send({ data: deletedProduct });
    } catch (e) {
        console.log(e);
        throw new Error('Something went wrong');
    }
};
