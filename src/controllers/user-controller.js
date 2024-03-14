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

export const getUser = (req, res) => {
    try {
        const { id } = req.body;

        res.status(201).send({ message: 'ok' });
    } catch (error) {
        res.status(404).send({ message: error });
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
