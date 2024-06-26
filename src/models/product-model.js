import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    pictureUrl: {
        type: String,
    },
});

const Product = mongoose.model('Product', productSchema);
export { Product };
