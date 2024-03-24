import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bucketSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const Bucket = model('Bucket', bucketSchema);
