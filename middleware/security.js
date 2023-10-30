const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");
const { readUserJwt } = require("../utils/tokens");

const extractTokenFromBearerHeader = ({ headers }) => {
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if (scheme.trim() === "Bearer") {
            return token;
        }
    }
    return undefined;
};

const extractUserFromJwt = async (req, res, next) => {
    try {
        const token = extractTokenFromBearerHeader(req);
        res.locals.token = token;
        if (token) {
            res.locals.user = await readUserJwt(token);
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals;
        if (!user?.email) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    extractUserFromJwt,
    extractTokenFromBearerHeader,
    requireAuthenticatedUser,
};
