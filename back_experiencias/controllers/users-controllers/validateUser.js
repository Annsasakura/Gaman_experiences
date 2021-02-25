"use strict";
const repository = require("../../repositories/users-repository");

async function validateUser(req, res, next) {
  try {
    const { code, email } = req.query;

    //comprobar que el usuario existe
    const user = await repository.getUserByEmail(email);
    if (!user) {
      const error = new Error("No existe un usuario con ese email");
      error.status = 400;
      throw error;
    }

    //comprobar que aun no está activo
    if (user.status === 1) {
      const error = new Error("Esta cuenta ya ha sido verificada.");
      error.status = 400;
      throw error;
    }
    //comparar codigo de verificación
    if (user.veification_code !== code) {
      const error = new Error("El código de verificación no coincidie");
      error.status = 400;
      throw error;
    }

    //cambiar estado y eliminar código de verificación
    await repository.changeStatus(code);

    res.send({ message: "Usuario verificado con exito" });
  } catch (error) {
    next(error);
  }
}

module.exports = validateUser;
