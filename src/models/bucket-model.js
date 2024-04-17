import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bucketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: Number,
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
});

export const Bucket = model('Bucket', bucketSchema);
