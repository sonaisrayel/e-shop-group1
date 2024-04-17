import { User } from '../models/user-model.js';
import CryptoLib from '../libs/crypto-lib.js';
import { passwordValidationSchema } from '../utils/validations.js';
import { Product } from '../models/product-model.js';
import ResponseHandler from '../responses/responseHandler.js';

export const addUserImage = async (req, res, next) => {
    try {
        const { id } = req.userInfo;

        const updatedUser = await User.findOneAndUpdate({ _id: id }, { pictureUrl: req.file.path }, { new: true });

        return ResponseHandler.handleUpdateResponse(res, { data: updatedUser });
    } catch (err) {
        next(err.message);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');

        return ResponseHandler.handleGetResponse(res, { data: user });
    } catch (err) {
        next(err.message);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const buyers = await User.find({ role: 'buyer' }).select('-password');
        const sellers = await User.find({ role: 'seller' }).select('-password');

        return ResponseHandler.handleGetResponse(res, { buyers, sellers });
    } catch (err) {
        next(err.message);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.userInfo;
        const { oldPassword, newPassword, reNewPassword } = req.body;

        let updatedUser = null;

        if (oldPassword) {
            const user = await User.findOne({ _id: id });

            const isPasswordCorrect = await CryptoLib.compareHashedPassword(oldPassword, user.password);

            if (!isPasswordCorrect) {
                return ResponseHandler.handleValidationError(res, { message: 'Wrong password' });
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

        return ResponseHandler.handleUpdateResponse(res, { data: updatedUser });
    } catch (err) {
        next(err.message);
    }
};

export const getUserProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { limit, skip } = req.query;
        const [products, totalDocuments] = await Promise.all([
            Product.find({ seller: id }).limit(limit).skip(skip),
            Product.countDocuments({}),
        ]);
        if (!products.length) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found' });
        }
        return ResponseHandler.handleGetResponse(res, { data: products, total: totalDocuments });
    } catch (err) {
        next(err.message);
    }
};
