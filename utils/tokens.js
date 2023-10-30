const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (data) =>
    jwt.sign(data, SECRET_KEY, { expiresIn: "30d" });

const createUserJwt = (user) => {
    const payload = {
        email: user.email,
    };
    console.log("Insert jwt into valid_jwt table");
    //! insert jwt into valid_jwt table
    //todo insert jwt into valid_jwt table
    return generateToken(payload);
};

const validateToken = (token) => {
    try {
        console.log("Check if jwt is in valid_jwt table");
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (err) {
        return {};
    }
};

module.exports = {
    generateToken,
    validateToken,
    createUserJwt,
};
