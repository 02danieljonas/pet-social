const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");
const Pet = require("./pet");

class Post {
    static async makePublicPost(post) {
        const pet = await Pet.makePublicPet(
            await Pet.fetchPetById(post.pet_id)
        );

        return {
            displayName: pet.displayName,
            post: post.post,
            datePosted: post.date_posted,
            img: post.img,
        };
    }

    static validateObject(obj, fields){
        try {
            
        } catch (error) {
            
        }
    }

    static async createPost(email, postInfo) {
        const requiredFields = ["post"];

        requiredFields.forEach((field) => {
            if (!postInfo.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        if (postInfo.post.trim() === "") {
            throw new BadRequestError("Post should not be empty");
        }

        postInfo.petId = (await Pet.fetchPetByEmail(email)).pet_id;

        const result = await db.query(
            `INSERT INTO post(
                pet_id,
                post,
                img
            )
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [postInfo.petId, postInfo.post, postInfo.img]
        );
        const post = result.rows[0];
        console.log("------------------");
        console.log(await Post.makePublicPost(post));
        return await Post.makePublicPost(post);
    }

    static async deletePost(email, postInfo) {
        const requiredFields = ["postId"];
        requiredFields.forEach((field) => {
            if (!postInfo.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        const petId = (await Pet.fetchPetByEmail(email)).pet_id;

        const query = `DELETE FROM post WHERE pet_id = $1 AND post_id = $2`;
        const result = await db.query(query, [petId, postInfo.postId]);
        if (result.rowCount > 0) {
            return;
        } else {
            throw new BadRequestError(
                `This post does not exist or does not have you as the author. Post id: ${postInfo.postId}`
            );
        }
    }

    static async getAllPostFromPet(petId) {
        // select * from post where pet_id = petId
    }

    static async getAPost(postId) {
        // select * from post where post_id = postId
    }

    // get all post of a user

    // get a single post

    static async test() {
        return this.makePublicPost();
    }

    static async register(petInfo) {
        const requiredFields = ["username", "email", "password", "displayName"];
        requiredFields.forEach((field) => {
            if (!petInfo.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        });

        if (petInfo.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email");
        }

        if (petInfo.displayName === "") {
            throw new BadRequestError("Invalid display name");
        }

        const lowercasedEmail = petInfo.email.toLowerCase();

        const existingPet = await Pet.fetchPetByEmail(lowercasedEmail);
        if (existingPet) {
            throw new BadRequestError(`Duplicate email: ${petInfo.email}`);
        }

        const hashedPassword = await bcrypt.hash(
            petInfo.password,
            BCRYPT_WORK_FACTOR
        );
        const result = await db.query(
            ` INSERT INTO pet (
                username,
                email,
                password,
                display_name,
                dob,
                profile_img
                )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [
                petInfo.username,
                lowercasedEmail,
                hashedPassword,
                petInfo.displayName,
                petInfo.DOB,
                petInfo.profileImg,
            ]
        );
        const pet = result.rows[0];
        return Pet.makePublicPet(pet);
    }

    static async fetchPetByUsername(username) {
        // console.log(username);
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

module.exports = Post;
