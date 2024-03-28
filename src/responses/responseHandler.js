import HttpStatusCodes from 'http-status-codes';

export default class ResponseHandler {
    static handleGetResponse(res, data) {
        return res.status(HttpStatusCodes.OK).send(data);
    }

    static handlePostResponse(res, data) {
        return res.status(HttpStatusCodes.CREATED).send(data);
    }

    static handleDeleteResponse(res, data) {
        return res.status(HttpStatusCodes.ACCEPTED).send(data);
    }
    static handleUpdateResponse(res, data) {
        return res.status(HttpStatusCodes.OK).send(data);
    }

    static handleValidationError(err, res) {
        return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).send({ message: err.message });
    }
    static handleServerError(err, res) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
    static handleNotFoundError(err, res) {
        return res.status(HttpStatusCodes.NOT_FOUND).send({ message: err.message });
    }
    static handleAuthorizationError(err, res) {
        return res.status(HttpStatusCodes.FORBIDDEN).send({ message: err.message });
    }
}
