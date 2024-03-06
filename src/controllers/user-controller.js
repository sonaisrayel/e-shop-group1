export const register = async (req, res) => {
    const { firstname, lastname, email, password, rePassword, userType } = req.body;

    console.log(firstname, lastname, email, password, rePassword, userType);

    res.status(202).send({ message: 'ok' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    res.status(202).send({ message: 'ok' });
};
