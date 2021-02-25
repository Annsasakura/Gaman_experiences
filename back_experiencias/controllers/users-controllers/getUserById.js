"use strict";
const repository = require("../../repositories/users-repository");

async function getUserById(req, res, next) {
  try {
    const { id } = req.auth;

    const user = await repository.getUsersById(id);

    if (!user) {
      const error = new Error("Usuario no existe");
      error.status = 404;
      throw error;
    }

    res.send({ user });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserById;
