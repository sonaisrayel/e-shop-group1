import { User } from '../models/user-model.js';
import CryptoLib from '../libs/crypto-lib.js';
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

        console.log(email, password);

        CryptoLib.compareHashedPassword(password);

        res.status(200).send({ message: 'ok' });
    } catch (error) {
        console.log(error);
    }
};
