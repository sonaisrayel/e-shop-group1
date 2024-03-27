import { Product } from '../models/product-model.js';
import { productValidationSchema } from '../utils/validations.js';

export const createProduct = async (req, res) => {
    try {
        const { userInfo } = req;
        if (!userInfo || userInfo.role !== 'seller') {
            throw new Error('Only sellers are authorized to create products');
        }
        const { name, price, description, category, author, quantity } = await productValidationSchema.validateAsync(
            req.body
        );

        const newProduct = new Product({ name, price, seller: userInfo.id, quantity, description, category, author });
        await newProduct.save();
        res.status(201).send({ data: newProduct });
    } catch (e) {
        res.status(403).send({ message: e.message });
    }
};
export const addProductImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { userInfo } = req;
        if (!req.file) {
            throw new Error('Missing required parameters');
        }
        const productImage = await Product.findOneAndUpdate(
            { _id: id, seller: userInfo.id },
            { pictureUrl: req.file.path },
            { new: true }
        );
        if (!productImage) {
            throw new Error('Product not found');
        }
        res.status(201).send({ message: 'ok', data: productImage });
    } catch (error) {
        res.status(404).send({ message: error.message });
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
        const productToDelete = await Product.findOneAndDelete({ _id: id, seller: userInfo.id });

        if (!productToDelete) {
            throw new Error('Product not found or unauthorized to delete');
        }

        res.status(200).send({ data: productToDelete });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;
        const payload = req.body;
        let productToUpdate = null;
        if (req.file) {
            productToUpdate = await Product.findOneAndUpdate(
                { _id: id, seller: userInfo.id },
                { pictureUrl: req.file.path },
                { new: true }
            );
        } else {
            productToUpdate = await Product.findOneAndUpdate({ _id: id, seller: userInfo.id }, payload, {
                new: true,
            });
        }
        if (!productToUpdate) {
            throw new Error('Product not found or unauthorized to update');
        }
        res.status(200).send({ data: productToUpdate });
    } catch (e) {
        res.status(404).send(e.message);
    }
};
