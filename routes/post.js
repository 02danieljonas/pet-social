const express = require("express");
const Post = require("../models/post");
const Pet = require("../models/pet");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", async (req, res) => {
    return res.status(200).json({ ping: await Post.test() });
});

router.post("/create", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        return res.status(200).json({
            post: await Post.createPost(res.locals.user.email, req.body),
        });
    } catch (err) {
        next(err);
    }
});

router.post("/delete", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        return res.status(200).json({
            post: await Post.deletePost(res.locals.user.email, req.body),
        });
    } catch (err) {
        next(err);
    }
});

router.post("/getAllPost", async (req, res, next) => {
    try {
        return res.status(200).json({
            posts: await Post.getAllPostFromPet(res.locals.user.email, req.body),
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
