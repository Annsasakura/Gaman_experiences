"use strict";

const Joi = require("joi");
const repository = require("../../repositories/users-repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    await schema.validateAsync(req.body);

    // comprobar si el mail existe
    const user = await repository.getUserByEmail(email);
    if (!user) {
      const error = new Error(
        "No hay ninguna cuenta asociada a esta dirección de correo electrónico. Inténtalo con otro correo electrónico."
      );
      error.status = 404;
      throw error;
    }

    // comprobar la contraseña
    const validPassword = await bcrypt.compare(password, user.passwords);
    if (!validPassword) {
      const error = new Error(
        "La contraseña no es correcta. Inténtalo de nuevo."
      );
      error.status = 401;
      throw error;
    }

    // comprobar si está activo
    if (user.status === 0) {
      const error = new Error("Usuario no verificado, revisa tu email.");
      error.status = 400;
      throw error;
    }

    // generar el token
    const tokenPayLoad = {
      id: user.id,
      name: user.first_name,
      email: user.email,
      role: user.user_type,
    };
    const token = jwt.sign(tokenPayLoad, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = login;
