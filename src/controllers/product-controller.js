import { Product } from '../models/product-model.js';

export const createProduct = async (req, res) => {
    try {
        const { userInfo } = req;
        const { name, price, seller, description, category, author } = req.body;
        if (!userInfo || userInfo.role !== 'seller') {
            throw new Error('Only sellers are authorized to create products');
        }
        const newProduct = new Product({ name, price, seller: userInfo.id, description, category, author });
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

        res.status(201).send({ data: products, total: totalDocuments });
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
        const productToDelete = await Product.findById(id);
        if (!productToDelete) {
            throw new Error('Product not found');
        }
        if (!productToDelete.seller.equals(userInfo.id)) {
            throw new Error('You are not authorized to delete this product');
        }
        const deletedProduct = await Product.findOneAndDelete({ _id: id });

        res.status(200).send({ data: deletedProduct });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;
        const payload = req.body;
        const productToUpdate = await Product.findOne({ _id: id });
        if (!productToUpdate) {
            throw new Error('Product not found');
        }
        if (!productToUpdate.seller.equals(userInfo.id)) {
            throw new Error('You are not authorized to update this product');
        }
        const updatedProduct = await Product.findOneAndUpdate({ _id: id }, payload, { new: true });

        res.status(200).send({ data: updatedProduct });
    } catch (e) {
        res.status(404).send(e.message);
    }
};
