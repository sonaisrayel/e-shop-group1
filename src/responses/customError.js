export default class ErrorMiddleware {
    static async customError(err, req, res) {
        console.log(err);
        res.status(500).send({ message: err });
    }
}
