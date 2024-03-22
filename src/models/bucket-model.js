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
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const Bucket = model('Bucket', bucketSchema);
