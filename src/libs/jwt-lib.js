import JWT from 'jsonwebtoken';
const { SECRET } = process.env;

const createToken = async (payload) => {
    return JWT.sign(payload, SECRET);
};

const verifyToken = async (token) => {
    return JWT.verify(token, SECRET);
};

export default { createToken, verifyToken };
