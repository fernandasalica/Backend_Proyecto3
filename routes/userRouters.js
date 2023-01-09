const express = require("express");
const routes = express.Router();
const { body } = require("express-validator");
const auth = require("../middlewars/auth");

const {
  newUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

routes.post(
  "/register",
  [
    body("name", "Campo Nombre de Usuario esta Vacio").notEmpty(),
    body("name", "ERR: Caracteres:  min 10, max 50").isLength({
      min: 10,
      max: 50,
    }),
    body("password", "Campo Contraseña Vacio").notEmpty(),
    body("password", "ERR: Caracteres: min 8 max 25").notEmpty({
      min: 8,
      max: 25,
    }),
  ],
  newUser
);

routes.post(
  "/login",
  [
    body("name", "Campo Nombre de Usuario esta Vacio").notEmpty(),
    body("name", "ERR: Caracteres:  min 10, max 50").isLength({
      min: 10,
      max: 50,
    }),
    body("password", "Campo Contraseña Vacio").notEmpty(),
    body("password", "ERR: Caracteres: min 8 max 25").notEmpty({
      min: 8,
      max: 25,
    }),
  ],
  loginUser
);

routes.get("/logout", auth(["admin", "user"]), logoutUser);

module.exports = routes;
