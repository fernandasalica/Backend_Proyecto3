const MovieModel = require("../models/movieSchema");
const { validationResult } = require("express-validator");

exports.newMovie = async (req, res) => {
  const existsMovie = await MovieModel.findOne({ name: req.body.name });

  if (existsMovie) {
    res.status(400).json({ msg: "Película duplicada" });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const movie = new MovieModel(req.body);
    movie.save();
    res.send("Pelicula creada correctamente.");
  } catch (error) {
    console.log("Error", error);
  }
};

exports.viewMovie = async (req, res) => {
  const movies = await MovieModel.find();
  res.send(movies);
};

exports.viewMovieId = async (req, res) => {
  const movie = await MovieModel.findOne({ _id: req.params.id });
  res.send(movie);
};

exports.viewMovieCategory = async (req, res) => {
  const movie = await MovieModel.find({ category: req.params.category });
  res.send(movie);
};

exports.editOneMovie = async (req, res) => {
  const { name, category, year, directedby, actors, story, image, trailer } =
    req.body;
  const { body } = req;

  if (
    name === "" &&
    category === "" &&
    year === "" &&
    directedby === "" &&
    actors === "" &&
    story === "" &&
    image === "" &&
    trailer === ""
  ) {
    return res.status(422).json({
      msg: "Formulario Totalmente Vacio. Se debe completar TODO el formulario",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const modifyProd = await MovieModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: body.name,
        category: body.category,
        year: body.year,
        directedby: body.directedby,
        actors: body.actors,
        story: body.story,
        image: body.image,
        trailer: body.trailer,
      },
      { new: true }
    );
    res.send("Pelicula modificada correctamente.");
  } catch (error) {
    console.log("error", error);
  }
};

exports.deleteOneMovie = async (req, res) => {
  try {
    const deleteProd = await MovieModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (deleteProd) {
      res.status(200).json({ msg: "Producto Eliminado" });
    } else {
      res.status(400).json({ msg: "Producto no encontrado" });
    }
  } catch (error) {
    console.log("error", error);
  }
};
