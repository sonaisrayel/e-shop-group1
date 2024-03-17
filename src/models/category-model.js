import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    isDiscounted: {
        type: Boolean,
        default: false,
    },
});

export const Category = model('Category', categorySchema);
