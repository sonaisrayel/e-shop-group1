export default class ErrorMiddleware {
    static async customError(err, req, res, next) {
        console.log(err);
        res.status(500).send({ message: err });
    }
}
