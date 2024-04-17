import JWTLib from '../libs/jwt-lib.js';

export const isAuthorized = async (req, res, next) => {
    try {
        const { token } = req.headers;
        req.userInfo = await JWTLib.verifyToken(token);
        next();
    } catch (e) {
        return next(e.message);
    }
};
