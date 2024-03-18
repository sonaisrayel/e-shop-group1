import { Product } from '../models/product-model.js';

export const createProduct = async (req, res) => {
    try {
        const { userInfo } = req;
        const { name, price, seller, description, category, author } = req.body;
        if (!userInfo || userInfo.role !== 'seller') {
            throw new Error('Only sellers are authorized to create products');
        }
        const newProduct = new Product({ name, price, seller, description, category, author });
        await newProduct.save();
        res.status(201).send({ data: newProduct });
    } catch (e) {
        res.status(403).send({ message: e.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const { limit, skip } = req.query;
        const [products, totalDocuments] = await Promise.all([
            Product.find({}).limit(limit).skip(skip),
            Product.countDocuments({}),
        ]);
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
        const { userInfo } = req;
        const { id } = req.params;
        if (!userInfo || (userInfo.role !== 'seller' && userInfo.role !== 'admin')) {
            throw new Error('You are not authorized to delete products');
        }

        const deletedProduct = await Product.findOneAndDelete({ _id: id, contributor: userInfo._id });

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
        const { id } = req.params;
        const payload = req.body;
        if (!userInfo || userInfo.role !== 'seller') {
            throw new Error('You are not authorized to update products');
        }
        const updatedProduct = await Product.findOneAndUpdate({ _id: id, contributor: userInfo._id }, payload, {
            new: true,
        });
        if (!updatedProduct) {
            throw new Error('Unable to update product: You may not have permission or the product does not exist');
        }
        res.status(200).send({ data: updatedProduct });
    } catch (e) {
        res.status(404).send(e.message);
    }
};
