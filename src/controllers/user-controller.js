import { User } from '../models/user-model.js';

export const addUserImage = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser = await User.findOneAndUpdate({ _id: id }, { pictureUrl: req.file.path }, { new: true });

        res.status(201).send({ message: 'ok', data: updatedUser });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');

        res.status(200).send({ message: 'ok', data: user });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const { userType } = req.userInfo;

        if (userType !== 'admin') throw new Error('You are not authorized');

        const buyers = await User.find({ userType: 'buyer' }).select('-password');
        const sellers = await User.find({ userType: 'seller' }).select('-password');

        res.status(201).send({ message: 'ok', buyers, sellers });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const updateUser = (req, res) => {
    try {
        const { id } = req.body;

        res.status(201).send({ message: 'ok' });
    } catch (error) {
        res.status(404).send({ message: error });
    }
};
