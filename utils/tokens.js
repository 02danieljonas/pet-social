const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const Token = require("../models/token");

const generateToken = (data) => {
    const token = jwt.sign(data, SECRET_KEY, { expiresIn: "30d" });
    Token.insertToken(data.email, token);
    return token;
};

const createUserJwt = (user) => {
    const payload = {
        email: user.email,
    };
    return generateToken(payload);
};

const readUserJwt = async (token) => {
    const decoded = jwt.verify(token, SECRET_KEY);
    await Token.validateToken(decoded.email, token);
    return decoded;
};

module.exports = {
    generateToken,
    readUserJwt,
    createUserJwt,
};
