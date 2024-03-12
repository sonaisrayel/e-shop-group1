import bcrypt from 'bcrypt';

const makeHashedPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const compareHashedPassword = async (password, userParams) => {
    return await bcrypt.compare(password, userParams);
};

export default { compareHashedPassword, makeHashedPassword };
