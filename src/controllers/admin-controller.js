import 'dotenv/config';
import JWT from '../libs/jwt-lib.js';
import ResponseHandler from '../responses/responseHandler.js';

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export const adminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (ADMIN_USERNAME !== username || password !== ADMIN_PASSWORD) {
            return ResponseHandler.handleAuthorizationError(res, { message: 'You are not an admin!!!' });
        }

        const token = await JWT.createToken({ username, role: 'admin' });

        return ResponseHandler.handlePostResponse(res, { token });
    } catch (err) {
        next(err.message);
    }
};
