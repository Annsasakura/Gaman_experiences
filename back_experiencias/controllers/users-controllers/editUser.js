"use strict";

const Joi = require("joi");
const repository = require("../../repositories/users-repository");
const helpers = require("../../helpers/helpers");

async function editUser(req, res, next) {
  try {
    const { id } = req.auth;
    const { nombre, apellido, dni, tlfn, bio, sexo } = req.body;

    const schema = Joi.object({
      id: Joi.number().positive(),
      nombre: Joi.string().required(),
      apellido: Joi.string().allow(""),
      dni: Joi.string().min(9).max(9).required(),
      tlfn: Joi.number().max(999999999).allow(""),
      bio: Joi.string().allow(""),
      sexo: Joi.string().allow(""),
    });
    await schema.validateAsync({
      id,
      nombre,
      apellido,
      dni,
      tlfn,
      bio,
      sexo,
    });

    //buscar el usuario
    const user = await repository.getUsersById(id);
    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      throw error;
    }

    // Subir imagen de usuario
    let savedFileName = user.photo_user;

    // si recibimos info
    if (req.files && req.files.photo) {
      savedFileName = await helpers.tuneaGuardarEnCarpetaDevuelveRuta(
        req.files.photo,
        500
      );

      //si el usuario ya tiene una foto en la db: la eliminamos del directorio
      if (user && user.photo_user) {
        await helpers.deletePhoto(user.photo_user);
      }
    }

    const foto = savedFileName;

    // actualizamos en la bd
    await repository.editUsers(
      nombre,
      apellido,
      dni,
      tlfn,
      bio,
      foto,
      sexo,
      id
    );
    const userUpdate = await repository.getUsersById(id);
    res.send({ userUpdate });
  } catch (error) {
    next(error);
  }
}

module.exports = editUser;
