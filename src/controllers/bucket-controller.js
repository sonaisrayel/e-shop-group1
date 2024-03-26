import { Bucket } from '../models/bucket-model.js';
import { Product } from '../models/product-model.js';

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
        const { productId, quantity } = req.body;
        const userId = req.userInfo._id;

        const product = await Product.findOne({ _id: productId });

        if (product.quantity < quantity) {
            throw new Error('Product not available in that quantity');
        }

        const currentBucketData = await Bucket.findOne({ userId });

        if (!currentBucketData) {
            const data = {
                userId,
                products: [
                    {
                        productId,
                        quantity,
                    },
                ],
            };

            const bucketItems = await Bucket.create(data);
            res.status(201).send({ message: 'Bucket was created', data: bucketItems });
        }

        const pickedProduct = currentBucketData.products.find((prod) => prod.productId.toString() === productId);

        if (pickedProduct) {
            pickedProduct.quantity += quantity;
        } else {
            currentBucketData.products.push({ productId, quantity });
        }

        const bucketData = await currentBucketData.save();

        res.status(201).send(bucketData);
    } catch (e) {
        res.status(404).send(e.message);
    }
};

export const updateProductInBucket = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userInfo.id;

        res.status(201).send({ message: 'ok' });
    } catch (e) {
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
