import { User } from '../models/user-model.js';
import { Favorites } from '../models/favorites-model.js';
import { Bucket } from '../models/bucket-model.js';
import CryptoLib from '../libs/crypto-lib.js';
import JWT from '../libs/jwt-lib.js';
import { userValidationSchema } from '../utils/validations.js';
import ResponseHandler from '../responses/responseHandler.js';

export const register = async (req, res, next) => {
    try {
        const { username, email, password, rePassword, role, address1, address2, city, country, mobile } = req.body;

        await userValidationSchema.validateAsync({
            username,
            email,
            password,
            rePassword,
            address1,
            address2,
            city,
            country,
            mobile,
        });

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return ResponseHandler.handleValidationError(res, { message: 'Duplicate Username' });
        }

        if (existingEmail) {
            return ResponseHandler.handleValidationError(res, { message: 'Duplicate Email' });
        }

        const hashedPassword = await CryptoLib.makeHashedPassword(password);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role,
            address1,
            address2,
            city,
            country,
            mobile,
        });

        await user.save();

        const [registeredUser] = await User.find({ email }).select('-password');

        if (registeredUser.role === 'buyer') {
            await Promise.all([
                Favorites.create({
                    userId: registeredUser._id,
                    products: [],
                }),
                Bucket.create({
                    userId: registeredUser._id,
                    products: [],
                }),
            ]);
        }

        return ResponseHandler.handlePostResponse(res, { message: 'User is created.', data: registeredUser });
    } catch (err) {
        next(err.message);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const [user] = await User.find({ email });

        if (!user) {
            return ResponseHandler.handleValidationError(res, { message: 'Email or Password is incorrect.' });
        }

        const isPasswordCorrect = await CryptoLib.compareHashedPassword(password, user.password);

        if (!isPasswordCorrect) {
            return ResponseHandler.handleValidationError(res, { message: 'Email or Password is incorrect.' });
        }

        const token = await JWT.createToken({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        });

        return ResponseHandler.handlePostResponse(res, {
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (err) {
        next(err.message);
    }
};
