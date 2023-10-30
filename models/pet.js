const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");

class Pet {
    static async makePublicPet(pet) {
        return {
            id: pet.pet_id,
            username: pet.username,
            firstName: pet.display_name,
            email: pet.email,
            dateJoined: pet.date_joined,
            DOB: pet.dob
        };
    }

    static async login(credentials) {
        const requiredFields = ["username", "password"];
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });
        const pet = await Pet.fetchPetByUsername(credentials.username);
        if (pet) {
            const isValid = await bcrypt.compare(
                credentials.password,
                pet.password
            );
            if (isValid) {
                return Pet.makePublicPet(pet);
            }
        } else {
            await bcrypt.compare(
                "$2b$13$YFcwwKjaYhqqEuGHFlH.vO2I85GC2SSAEw5d5ATpAWvFi4haHGsyq",
                credentials.password
            );
        }
        throw new UnauthorizedError("Invalid username or password");
    }

    static async register(credentials) {
        const requiredFields = [
            "username",
            "email",
            "password",
            "displayName"
        ];
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email");
        }

        if (credentials.displayName === "") {
            throw new BadRequestError("Invalid display name");
        }

        const lowercasedEmail = credentials.email.toLowerCase();

        const existingPet = await Pet.fetchPetByEmail(lowercasedEmail);
        if (existingPet) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }

        const hashedPassword = await bcrypt.hash(
            credentials.password,
            BCRYPT_WORK_FACTOR
        );
        const result = await db.query(
            ` INSERT INTO pet (
                username,
                email,
                password,
                display_name,
                dob
                )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING pet_id, username, display_name, email, date_joined, dob
            `,
            [
                credentials.username,
                lowercasedEmail,
                hashedPassword,
                credentials.displayName,
                credentials.DOB,
            ]
        );
        const pet = result.rows[0];
        return Pet.makePublicPet(pet);
    }

    static async fetchPetByUsername(username) {
        console.log(username)
        if (!username) {
            throw new BadRequestError("No username provided");
        }
        const query = `SELECT * FROM pet WHERE username = $1`;
        const result = await db.query(query, [username]);
        const pet = result.rows[0];
        return pet;
    }

    static async fetchPetByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }
        const query = `SELECT * FROM pet WHERE email = $1`;
        const result = await db.query(query, [email.toLowerCase()]);
        const pet = result.rows[0];
        return pet;
    }
}

module.exports = Pet;
