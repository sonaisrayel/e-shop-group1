import { User } from '../models/user-model.js';
import CryptoLib from '../libs/crypto-lib.js';
import JWT from '../libs/jwt-lib.js';
import { userValidationSchema } from '../utils/validations.js';

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, rePassword, userType } = req.body;

        await userValidationSchema.validateAsync({
            firstname,
            lastname,
            email,
            password,
            rePassword,
        });

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error('Duplicate Email');
        }

        const hashedPassword = await CryptoLib.makeHashedPassword(password);

        const user = await User.create({ firstname, lastname, email, password: hashedPassword, userType });

        res.status(201).send({ message: 'User is created.', user });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [user] = await User.find({ email });

        if (!user) {
            throw new Error('Email or Password is incorrect.');
        }

        const isPasswordCorrect = await CryptoLib.compareHashedPassword(password, user.password);

        if (!isPasswordCorrect) {
            throw new Error('Email or Password is incorrect.');
        }

        const token = await JWT.createToken({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            userType: user.userType,
        });

        res.status(200).send({
            message: 'The user is logged in.',
            data: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                userType: user.userType,
            },
            token,
        });
    } catch (error) {
        console.log(error);
    }
};
