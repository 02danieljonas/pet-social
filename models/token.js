const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const Pet = require("./pet");

class Token {
    static async deleteToken(email, token) {
        const pet = await Pet.fetchPetByEmail(email);
        const query = `DELETE FROM valid_jwt WHERE pet_id = $1 and token = $2`;
        await db.query(query, [pet.pet_id, token]);
    }

    static async insertToken(email, token) {
        const pet = await Pet.fetchPetByEmail(email);
        const query = `INSERT INTO valid_jwt( pet_id, token) VALUES ($1, $2)`;
        await db.query(query, [pet.pet_id, token]);
    }

    static async validateToken(email, token) {
        const pet = await Pet.fetchPetByEmail(email);
        const query = `SELECT * FROM valid_jwt WHERE pet_id = $1 and token = $2`;
        const result = await db.query(query, [pet.pet_id, token]);
        if (result.rows[0] == undefined) {
            throw new UnauthorizedError("Invalid token");
        }
    }

    // static async generateToken(data) {
    //     const token = jwt.sign(data, SECRET_KEY, { expiresIn: "30d" });
    //     return token;
    // }

    // static async createUserJwt(user) {
    //     const payload = {
    //         email: user.email,
    //     };
    //     console.log("Insert jwt into valid_jwt table");
    //     //! insert jwt into valid_jwt table
    //     //todo insert jwt into valid_jwt table
    //     return generateToken(payload);
    // }

    // static async validateToken(token) {
    //     try {
    //         console.log("Check if jwt is in valid_jwt table");
    //         const decoded = jwt.verify(token, SECRET_KEY);
    //         return decoded;
    //     } catch (err) {
    //         return {};
    //     }
    // }
}

module.exports = Token;
