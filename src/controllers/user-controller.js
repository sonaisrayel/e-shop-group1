import { User } from '../models/user-model.js';
import CryptoLib from '../libs/crypto-lib.js';
import { passwordValidationSchema } from '../utils/validations.js';
import { Product } from '../models/product-model.js';

export const addUserImage = async (req, res) => {
    try {
        const { id } = req.userInfo;

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
        const { role } = req.userInfo;

        if (role !== 'admin') {
            throw new Error('You are not authorized');
        }

        const buyers = await User.find({ role: 'buyer' }).select('-password');
        const sellers = await User.find({ role: 'seller' }).select('-password');

        res.status(201).send({ message: 'ok', buyers, sellers });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.userInfo;
        const { oldPassword, newPassword, reNewPassword } = req.body;

        let updatedUser = null;

        if (oldPassword) {
            const user = await User.findOne({ _id: id });

            const isPasswordCorrect = await CryptoLib.compareHashedPassword(oldPassword, user.password);

            if (!isPasswordCorrect) {
                throw new Error('Wrong password');
            }

            await passwordValidationSchema.validateAsync({
                newPassword,
                reNewPassword,
            });

            const hashedPassword = await CryptoLib.makeHashedPassword(newPassword);

            updatedUser = await User.findOneAndUpdate({ _id: id }, { password: hashedPassword }, { new: true });
        }

        if (req.file) {
            updatedUser = await User.findOneAndUpdate({ _id: id }, { pictureUrl: req.file.path }, { new: true });
        }

        res.status(201).send({ message: 'ok', data: updatedUser });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const getUserProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { limit, skip } = req.query;
        const [products, totalDocuments] = await Promise.all([
            Product.find({ seller: id }).limit(limit).skip(skip),
            Product.countDocuments({}),
        ]);
        if (!products.length) {
            throw new Error('Product not found');
        }
        res.status(200).send({ message: 'ok', data: products, total: totalDocuments });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};
