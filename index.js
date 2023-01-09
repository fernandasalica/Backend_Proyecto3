const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

//database
require("./database");

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

//routers
app.use("/", routes);

//status server
app.listen(PORT, () => {
  console.log("back ejecutandose en puerto 3001");
});
