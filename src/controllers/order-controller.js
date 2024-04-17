import { Product } from '../models/product-model.js';
import { Bucket } from '../models/bucket-model.js';
import ResponseHandler from '../responses/responseHandler.js';
import { Order } from '../models/order-model.js';
import { pay, success } from '../libs/paypal-lib.js';

export const createOrder = async (req, res, next) => {
    try {
        const buyerId = req.userInfo.id;

        const currentBucket = await Bucket.findOne({ userId: buyerId }).populate('products');

        if (!currentBucket || currentBucket.products.length === 0) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Bucket is empty' });
        }

        const products = currentBucket.products.map(({ productId, quantity, price }) => ({
            productId,
            quantity,
            price,
        }));

        const newOrder = new Order({
            buyerId,
            products,
        });

        await pay(newOrder, currentBucket.totalPrice);
        await success('PAYID-MYFN2MI22L056856R346045U', '6BSZJ6R3WWJMS');

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
        return ResponseHandler.handleGetResponse(res, { data: orders });
    } catch (err) {
        next(err);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const { userInfo } = req;
        const { status, productId } = req.body;
        const product = await Product.findOne({ _id: productId, seller: userInfo.id });
        if (!product) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found' });
        }

        const orderToUpdate = await Order.findOne({ 'products.productId': productId });

        console.log(orderToUpdate, 'orderToUpdate');

        if (!orderToUpdate) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Order not found' });
        }

        orderToUpdate.status = status;
        await orderToUpdate.save();

        return ResponseHandler.handleUpdateResponse(res, { message: orderToUpdate });
    } catch (err) {
        next(err.message);
    }
};
