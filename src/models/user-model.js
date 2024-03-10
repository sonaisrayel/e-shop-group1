import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: false,
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
    },
    pictureUrl: {
        type: String,
    },
});

export const User = model('User', userSchema);
