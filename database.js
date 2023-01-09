const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:cd0qF9j2O68g4EB2@cluster0.kzptiwc.mongodb.net/movies",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("base de dato ok");
    }
  }
);
