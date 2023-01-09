const express = require("express");
const router = express.Router();

const userRouter = require("./userRouters");
const movieRouter = require("./movieRouter");

router.use("/user", userRouter);
router.use("/movies", movieRouter);

module.exports = router;
