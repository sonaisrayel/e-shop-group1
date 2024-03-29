import { Bucket } from '../models/bucket-model.js';
import { Product } from '../models/product-model.js';
import ResponseHandler from '../responses/responseHandler.js';

export const getBucket = async (req, res, next) => {
    try {
        const { limit, skip } = req.query;
        const userId = req.userInfo.id;

        const bucket = await Bucket.findOne({ userId }).limit(limit).skip(skip).populate('products.productId');

        return ResponseHandler.handleGetResponse(res, { data: bucket });
    } catch (err) {
        next(err.message);
    }
};

export const updateBucket = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userInfo.id;

        const product = await Product.findOne({ _id: productId });

        if (product.quantity < quantity) {
            return ResponseHandler.handleValidationError(res, { message: 'Product not available in that quantity' });
        }

        const currentBucketData = await Bucket.findOne({ userId });

        const pickedProduct = currentBucketData.products.find((prod) => prod.productId.toString() === productId);

        if (pickedProduct) {
            pickedProduct.quantity = Number(quantity);
        } else {
            currentBucketData.products.push({ productId, quantity });
        }

        const bucketData = await currentBucketData.save();

        res.status(201).send(bucketData);
        return ResponseHandler.handlePostResponse(res, { data: bucketData });
    } catch (err) {
        next(err.message);
    }
};

export const deleteProductFromBucket = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.userInfo.id;

        const currentBucketData = await Bucket.findOne({ userId });
        currentBucketData.products = currentBucketData.products.filter(
            (prod) => prod.productId.toString() !== productId
        );
        const bucketData = await currentBucketData.save();

        return ResponseHandler.handleDeleteResponse(res, {
            message: 'Product has been removed from bucket',
            updatedBucket: bucketData,
        });
    } catch (err) {
        next(err.message);
    }
};

export const deleteBucket = async (req, res, next) => {
    try {
        const userId = req.userInfo.id;

        const currentBucketData = await Bucket.findOne({ userId });
        currentBucketData.products = [];

        const bucketData = await currentBucketData.save();

        return ResponseHandler.handleDeleteResponse(res, { data: bucketData });
    } catch (err) {
        next(err.message);
    }
};
