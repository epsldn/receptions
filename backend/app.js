const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const routes = require("./routes");
const { ValidationError } = require("sequelize");

const environment = require("./config");
const isProduction = environment == "production";
const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnlly: true
        }
    })
);

app.use(routes);


app.use((_req, _res, next) => {
    const err = new Error("The requested resource could not be found.");
    err.title = "Resource not found";
    err.errors = { message: "The requested resource couldn't be found" };
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[errors.path] = error.message;
        }
        err.title = "Validation Error";
        err.errors = errors;
    }

    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});

module.exports = app;