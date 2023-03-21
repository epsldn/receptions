const e = require("express");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");
const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (error, jwtPayload) => {
        if (error) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            console.log("TESTING", id);
            req.user = await User.scope("currentUser").findByPk(id);
            console.log(req.user);
        } catch (error) {
            console.error(error);
            res.clearCookie("token");
            return next();
        }

        if (!req.user) res.clearCookie("token");

        return next();
    });
};

const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const error = new Error("Unauthorized");
    error.title = "Unauthorized";
    error.errors = ["Unauthorized"];
    error.status = 401;

    return next(error);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };