import 'dotenv/config';
import JWT from '../libs/jwt-lib.js';

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (ADMIN_USERNAME !== username || password !== ADMIN_PASSWORD) {
            throw new Error('You are not an admin!!!');
        }

        const token = await JWT.createToken({ username, userType: 'admin' });

        res.status(200).send({ message: 'ok', token });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};
