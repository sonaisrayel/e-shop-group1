import { Bucket } from '../models/bucket-model.js';
import { Product } from '../models/product-model.js';

export const getBucket = async (req, res) => {
    try {
        const { limit, skip } = req.query;
        const userId = req.userInfo.id;

        const bucket = await Bucket.findOne({ userId }).limit(limit).skip(skip).populate('products.productId');

        res.status(201).send({ message: 'ok', data: bucket });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

// if we improve this code, I think we will not need updateProductInBucket functionality, or better we can change the name of this
// controller to it.

export const addProductToBucket = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userInfo.id;

        const product = await Product.findOne({ _id: productId });

        if (product.quantity < quantity) {
            throw new Error('Product not available in that quantity');
        }

        const currentBucketData = await Bucket.findOne({ userId });

        // this can be remoived
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
        // end to be removed

        const pickedProduct = currentBucketData.products.find((prod) => prod.productId.toString() === productId);

        if (pickedProduct) {
            // I think we do not need to add the quantity, but only make it equal to the quantity received from the user/front
            pickedProduct.quantity += Number(quantity);
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

        const currentBucketData = await Bucket.findOne({ userId });
        currentBucketData.products = currentBucketData.products.filter(
            (prod) => prod.productId.toString() !== productId
        );
        const bucketData = await currentBucketData.save();

        res.status(201).send({ message: 'Product has been removed from bucket', updatedBucket: bucketData });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};
