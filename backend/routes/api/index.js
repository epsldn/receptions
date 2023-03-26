const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser, requireAuth } = require("../../utils/auth.js");

// router.get("/test", (req, res) => {
//     res.status(200).json({
//         message: "HELLO"
//     });
// });

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);

// router.post("/test", (req, res) => {
//     res.json({ requestBody: req.body });
// });
// router.get("/restore-user", (req, res) => {
//     console.dir(req);
//     return res.json(req.user);
// });

// router.get("/require-auth", requireAuth, (req, res) => {
//     return res.json(req.user);
// });

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require("../../db/models");

// router.get('/setTokenCookie', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: "Demo-lition"
//         }
//     });

//     setTokenCookie(res, user);

//     return res.json({ user });
// });

module.exports = router;
