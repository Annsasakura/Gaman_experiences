"use strict";
const repository = require("../../repositories/users-repository");

async function getUserRatings(req, res, next) {
  try {
    const { id } = req.auth;

    const noValorated = await repository.notValorate(id);

    const valorated = await repository.valorate(id);

    res.send({ valoradas: valorated, PorValorar: noValorated });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserRatings;
