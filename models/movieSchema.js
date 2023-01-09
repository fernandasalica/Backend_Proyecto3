const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  category: {
    type: String,
    trim: true,
  },
  year: {
    type: String,
    trim: true,
  },
  directedby: {
    type: String,
    trim: true,
  },
  actors: {
    type: String,
    trim: true,
  },
  story: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  trailer: {
    type: String,
    trim: true,
  },
});

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;
