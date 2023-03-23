const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth.js");
const { User } = require("../../db/models");

const router = express.Router();

router.post("/", async (req, res, next) => {
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