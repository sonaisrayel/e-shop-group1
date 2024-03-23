import JWTLib from '../libs/jwt-lib.js';

export const isAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers;
        req.adminInfo = await JWTLib.verifyToken(token);

        if (req.adminInfo.role !== 'admin') {
            throw new Error('You are not allowed.');
        }

        next();
    } catch (e) {
        return next(e.message);
    }
};
