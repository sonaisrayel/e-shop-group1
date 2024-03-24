import { Bucket } from '../models/bucket-model.js';

export const getBucket = async (req, res) => {
    try {
        const { limit, skip } = req.query;
        const userId = req.userInfo.id;

        const favorites = await Bucket.findOne({ userId }).limit(limit).skip(skip).populate('products.product');

        res.status(201).send({ message: 'ok', data: favorites });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

export const addProductToBucket = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userInfo.id;

        let quantity = req.body.quantity ? req.body.quantity : 1;

        const bucket = await Bucket.findOneAndUpdate(
            { userId },
            { $addToSet: { products: { product: productId, quantity } } },
            { new: true }
        );

        res.status(201).send({ message: 'Product added to Bucket', data: bucket });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

export const updateProductInBucket = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userInfo.id;

        res.status(201).send({ message: 'ok' });
    } catch (error) {
        res.status(404).send({ message: e.message });
    }
};

export const deleteProductFromBucket = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userInfo.id;

        const bucket = await Bucket.findOneAndUpdate(
            { userId, products: productId },
            {
                $pull: {
                    products: productId,
                },
            },
            { new: true }
        );

        if (!bucket) {
            throw new Error('No such product in the bucket.');
        }

        res.status(201).send({ message: 'Product has been removed from bucket' });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};
