import { Product } from '../models/product-model.js';
import ResponseHandler from '../responses/responseHandler.js';
import { productValidationSchema } from '../utils/validations.js';

export const createProduct = async (req, res, next) => {
    try {
        const { userInfo } = req;
        if (!userInfo || userInfo.role !== 'seller') {
            return ResponseHandler.handleAuthorizationError(res, {
                message: 'Only sellers are authorized to create products',
            });
        }
        const { name, price, description, category, author, quantity } = await productValidationSchema.validateAsync(
            req.body
        );

        const newProduct = new Product({ name, price, seller: userInfo.id, quantity, description, category, author });
        await newProduct.save();
        return ResponseHandler.handlePostResponse(res, { data: newProduct });
    } catch (err) {
        next(err.message);
    }
};
export const addProductImage = async (req, res, next) => {
    try {
        const { id } = req.body;
        const { userInfo } = req;
        if (!req.file) {
            return ResponseHandler.handleValidationError(res, { message: 'Missing required parameters' });
        }
        const productImage = await Product.findOneAndUpdate(
            { _id: id, seller: userInfo.id },
            { pictureUrl: req.file.path },
            { new: true }
        );
        if (!productImage) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found' });
        }
        return ResponseHandler.handlePostResponse(res, { data: productImage });
    } catch (err) {
        next(err.message);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const { limit, skip } = req.query;
        const [products, totalDocuments] = await Promise.all([
            Product.find({}).limit(limit).skip(skip),
            Product.countDocuments({}),
        ]);
        if (!products.length) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found' });
        }

        return ResponseHandler.handleGetResponse(res, { data: products, total: totalDocuments });
    } catch (err) {
        next(err.message);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found' });
        }
        return ResponseHandler.handleGetResponse(res, { data: product });
    } catch (err) {
        next(err.message);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { userInfo } = req;
        const { id } = req.params;
        const productToDelete = await Product.findOneAndDelete({ _id: id, seller: userInfo.id });

        if (!productToDelete) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found or unauthorized to delete' });
        }

        return ResponseHandler.handleDeleteResponse(res, { data: productToDelete });
    } catch (err) {
        next(err.message);
    }
};

export const updateProduct = async (req, res, next) => {
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
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found or unauthorized to update' });
        }
        return ResponseHandler.handleUpdateResponse(res, { data: productToUpdate });
    } catch (err) {
        next(err.message);
    }
};
