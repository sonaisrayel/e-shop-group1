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

    static handleValidationError(res, message) {
        return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).send({ message });
    }
    static handleNotFoundError(res, message) {
        return res.status(HttpStatusCodes.NOT_FOUND).send({ message });
    }
    static handleAuthorizationError(res, message) {
        return res.status(HttpStatusCodes.FORBIDDEN).send({ message });
    }
}
