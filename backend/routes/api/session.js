const express = require("express");

const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation.js");
const { setTokenCookie, restoreUser } = require("../../utils/auth.js");
const { User } = require("../../db/models");

const router = express.Router();

const validateLogin = [
    check("crendtial").exists({ checkFalsy: true }).notEmpty().withMessage("PLease provide a valid email or username"),
    check("password").exists({ checkFalsy: true }).withMessage("Please provide a password."),
    handleValidationErrors
];

router.get("/", restoreUser, async (req, res) => {
    const { user } = req;

    if (user) {
        return res.json({ user: user.toSafeObject() });
    } else {
        return res.json();
    }
});

router.post("/", validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const error = new Error("Login Failed");
        error.status = 401;
        error.title = "Login Failed";
        error.errors = ["The provided credentials were invalid"];
        return next(error);
    }

    await setTokenCookie(res, user);

    return res.json({ user });
});

router.delete("/", (_req, res) => {
    res.clearCookie("token");
    return res.json({ message: "success" });
});

module.exports = router;