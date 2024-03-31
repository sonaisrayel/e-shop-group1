import { Product } from '../models/product-model.js';
import { Bucket } from '../models/bucket-model.js';
import ResponseHandler from '../responses/responseHandler.js';
import { Order } from '../models/order-model.js';

export const createOrder = async (req, res, next) => {
    try {
        const { buyerId } = req.body;
        if (!buyerId) {
            return ResponseHandler.handleValidationError(res, { message: 'Buyer ID is required.' });
        }
        const currentBucket = await Bucket.findOne({ userId: buyerId }).populate('products');
        if (!currentBucket || currentBucket.products.length === 0) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Bucket not found or is empty' });
        }
        console.log(currentBucket);
        const products = currentBucket.products.map(({ productId, quantity, price }) => ({
            productId,
            quantity,
            price,
        }));

        const newOrder = new Order({
            buyerId,
            products,
        });
        await newOrder.save();
        currentBucket.products = [];
        currentBucket.totalPrice = 0;
        await currentBucket.save();
        return ResponseHandler.handlePostResponse(res, { data: newOrder });
    } catch (err) {
        next(err.message);
    }
};

export const getOrders = async (req, res, next) => {
    try {
        const { buyerId } = req.params;
        const orders = await Order.find({ buyerId }).populate('products.productId');
        console.log(orders);
        return ResponseHandler.handleGetResponse(res, { data: orders });
    } catch (err) {
        next(err);
    }
};
export const updateOrder = async (req, res, next) => {
    try {
        const { userInfo } = req;
        const { productId } = req.params;
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found' });
        }
        if (!String(product.seller) === userInfo.id) {
            return ResponseHandler.handleAuthorizationError(res, { message: 'Not authorized to update' });
        }
        const orderToUpdate = await Order.findOne({ 'products.productId': productId });

        if (!orderToUpdate) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Order not found' });
        }

        orderToUpdate.status = 'shipped';
        await orderToUpdate.save();

        return ResponseHandler.handleUpdateResponse(res, { message: orderToUpdate });
    } catch (err) {
        next(err.message);
    }
};
