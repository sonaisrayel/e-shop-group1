import { User } from '../models/user-model.js';
import CryptoLib from '../libs/crypto-lib.js';
import JWT from '../libs/jwt-lib.js';
import { userValidationSchema } from '../utils/validations.js';

export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            rePassword,
            role,
            address1,
            address2,
            city,
            country,
            mobile,
            cardNumber,
            cardExpitarionDate,
            cardOwnerName,
        } = req.body;

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
            cardNumber,
            cardExpitarionDate,
            cardOwnerName,
        });

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            throw new Error('Duplicate Username');
        }

        if (existingEmail) {
            throw new Error('Duplicate Email');
        }

        const hashedPassword = await CryptoLib.makeHashedPassword(password);
        const date = cardExpitarionDate.split('/');
        const cardDate = `20${date[1]}-${date[0]}-01`;

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
            cardNumber,
            cardExpitarionDate: cardDate,
            cardOwnerName,
        });
        await user.save();

        const registeredUser = await User.find({ email }).select('-password');

        res.status(201).send({ message: 'User is created.', user: registeredUser });
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
            username: user.username,
            email: user.email,
            role: user.role,
        });

        res.status(200).send({
            message: 'The user is logged in.',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
    }
};
