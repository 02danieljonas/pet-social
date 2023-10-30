const express = require("express");
const Pet = require("../models/pet");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", function (req, res) {
    return res.status(200).json({ ping: "pong" });
});

router.post("/login", async (req, res, next) => {
    try {
        const user = await Pet.login(req.body);
        const token = createUserJwt(user);
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        const user = await Pet.register(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({ token, user });
    } catch (err) {
        next(err);
    }
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { email } = res.locals.user;
        const user = await Pet.fetchPetByEmail(email);
        const publicUser = await Pet.makePublicPet(user);
        return res.status(200).json({ user: publicUser });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
