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
        const product = await Product.findById({ _id: productId });
        if (product.quantity < quantity) {
            return ResponseHandler.handleValidationError(res, 'Product not available in that quantity');
        }
        let currentBucketData = await Bucket.findOne({ userId });
        if (!currentBucketData) {
            currentBucketData = new Bucket({
                userId,
                products: [],
            });
        }
        const pickedProduct = currentBucketData.products.find((prod) => prod.productId.toString() === productId);

        if (pickedProduct) {
            currentBucketData.totalPrice += product.price * (quantity - pickedProduct.quantity);
            pickedProduct.quantity = Number(quantity);
        } else {
            currentBucketData.totalPrice += product.price * quantity;
            currentBucketData.products.push({ productId, quantity });
        }

        const bucketData = await currentBucketData.save();
        return ResponseHandler.handlePostResponse(res, { data: bucketData });
    } catch (err) {
        next(err.message);
    }
};

export const deleteProductFromBucket = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.userInfo.id;

        const product = await Product.findById({ _id: productId });

        const currentBucketData = await Bucket.findOne({ userId });
        let quantityInBucket = 0;

        currentBucketData.products = currentBucketData.products.filter((prod) => {
            if (prod.productId.toString() === productId) {
                quantityInBucket = prod.quantity;
            }

            return prod.productId.toString() !== productId;
        });

        console.log(quantityInBucket, 'quantity in bucket');
        currentBucketData.totalPrice -= quantityInBucket * product.price;

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
        currentBucketData.totalPrice = 0;

        const bucketData = await currentBucketData.save();

        return ResponseHandler.handleDeleteResponse(res, { data: bucketData });
    } catch (err) {
        next(err.message);
    }
};
