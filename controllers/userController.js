const UserModel = require("../models/userSchema");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.newUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const existsUser = await UserModel.findOne({ name: req.body.name });

  if (existsUser) {
    res.status(400).json({ msg: "Usuario duplicado" });
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const passwordEncrypt = await bcryptjs.hash(req.body.password, salt);

    const newUserObj = {
      name: req.body.name,
      mail: req.body.mail,
      password: passwordEncrypt,
      role: req.body.role,
    };
    const Newuser = new UserModel(newUserObj);
    Newuser.save();
    res.send("Usuario creado correctamente");
  } catch (error) {
    console.log("registerRoute", error);
  }
};

exports.loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (name === "" && password === "") {
    return res.status(422).json({
      msg: "Formulario Totalmente Vacio. Se debe completar TODO el formulario",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { name, password } = req.body;
    const userExist = await UserModel.findOne({ name });
    if (!userExist) {
      res.status(404).json({ message: "usuario y/o contraseña incorrecto" });
    }

    const passCheck = await bcryptjs.compare(password, userExist.password);

    if (!passCheck) {
      res.status(404).json({ message: "usuario y/o contraseña incorrecto" });
    }
    res.send("usuario logueado");
    // const datosUsuarioParaToken = {
    //   user: {
    //     id: userExist.id,
    //     username: userExist.name,
    //     role: userExist.role,
    //   },
    // };

    // const token = jwt.sign(datosUsuarioParaToken, process.env.JWT_SECRET);
    // userExist.token = token;
    // await userModel.updateOne({ name }, userExist);
    // res.status(200).json(userExist);
  } catch (error) {
    console.log(error);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    await UserModel.updateOne(
      { _id: res.locals.user.id },
      { $set: { token: "" } }
    );
    res.json({ mensaje: "Deslogueo ok" });
  } catch (error) {
    console.log(error);
  }
};
