"use strict";
const Joi = require("joi").extend(require("@joi/date"));
const repository = require("../../repositories/users-repository");
const { differenceInYears } = require("date-fns");
const bcrypt = require("bcryptjs");
const helpers = require("../../helpers/helpers");
const { FRONT_URL } = process.env;

async function register(req, res, next) {
  try {
    const { nombre, fechaNac, email, password } = req.body;
    7;
    const schema = Joi.object({
      nombre: Joi.string().required(),
      fechaNac: Joi.date().format("YYYY-MM-DD").required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(16).required(),
      repeatPassword: Joi.ref("password"),
    });
    await schema.validateAsync(req.body);

    //generar código de verificación
    const verificationCode = Math.ceil(Math.random() * 1000000000000000);

    // comprobamos edad +18
    const now = new Date();
    const dateNac = new Date(fechaNac);
    const diference = differenceInYears(now, dateNac);
    if (diference < 18) {
      const error = new Error("Debes ser mayor de edad");
      error.status = 400;
      throw error;
    }

    //comprobar si el email existe
    const user = await repository.getUserByEmail(email);
    if (user) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 400;
      throw error;
    }

    //encriptar password
    const passwordHash = await bcrypt.hash(password, 10);
    const id = await repository.createUser(
      nombre,
      fechaNac,
      email,
      passwordHash,
      verificationCode
    );

    const validationURL = `http://${FRONT_URL}/?code=${verificationCode}&email=${email}`;

    //enviar email
    const subject = "Confirm your email";
    const text = `haz click <a href=${validationURL}> aquí </a> para validar tu cuenta`;

    await helpers.sendEmail(subject, text);

    res.send({ userId: id.insertId });
  } catch (error) {
    next(error);
  }
}

module.exports = register;
