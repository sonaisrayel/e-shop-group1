import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    status: {
        type: String,
        enum: ['instock', 'shipped'],
        default: 'instock',
    },
});

export const Order = model('order', orderSchema);
