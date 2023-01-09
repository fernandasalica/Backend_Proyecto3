const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movieController");

router.post("/new", MovieController.newMovie);
router.get("/viewmovies", MovieController.viewMovie);
router.get("/viewmovie/:id", MovieController.viewMovieId);
router.get("/viewmoviecat/:category", MovieController.viewMovieCategory);
router.put("/modifyOneMovie/:id", MovieController.modifyOneMovie);
router.delete("/deleteOneMovie/:id", MovieController.deleteOneMovie);

module.exports = router;
