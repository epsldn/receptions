const express = require("express");
const apiRoutes = require("./api");
const router = express.Router();

// router.get("/hello/world", function (req, res) {
//     res.cookie("XSRF-TOKEN", req.csrfToken());
//     res.send("Hello World!");
// });

router.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
    const path = require("path");

    router.get("/", (request, response) => {
        response.cookie("XSRF-TOKEN");
        return res.sendFile(path.resolve(__dirname, "../../frontend", "build", "index.html"));
    });

    router.use(express.static(path.resolve("../frontend/build")));

    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie("XSRF-TOKEN", req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, "../../frontend", "build", "index.html")
        );
    });
}

if (process.env.NODE_ENV !== "production") {
    router.get("/api/csrf/restore", (req, res) => {
      res.cookie("XSRF-TOKEN", req.csrfToken());
      return res.json({});
    });
  }


router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        "XSRF-Token": csrfToken
    });
});

module.exports = router;