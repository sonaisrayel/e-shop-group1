import { Product } from '../models/product-model.js';

export const createProduct = async (req, res) => {
    try {
        const { userInfo } = req;
        const { name, price, seller, description, category } = req.body;
        if (!userInfo || userInfo.role !== 'seller') {
            throw new Error('Only sellers are authorized to create products');
        }
        const newProduct = new Product({ name, price, seller, description, category });
        await newProduct.save();
        res.status(201).send({ data: newProduct });
    } catch (e) {
        res.status(403).send({ message: e.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products.length) {
            throw new Error('Product not found');
        }

        res.status(201).send({ data: products });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        res.status(201).send({ data: product });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new Error('Product not found');
        }
        res.status(201).send({ data: deletedProduct });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { userInfo } = req;
        console.log(userInfo, 'userinfo');
        const { id } = req.params;
        const payload = req.body;
        const updatedProduct = await Product.findOneAndUpdate({ _id: id, contributor: userInfo.id }, payload, {
            new: true,
        });
        const product = await Product.findById(id);
        if (!updatedProduct) {
            throw new Error('Unable to update product: You may not have permission or the product does not exist');
        }
        res.status(200).send({ data: updatedProduct });
    } catch (e) {
        res.status(404).send(e.message);
    }
};
