"use stric";

const repository = require("../../repositories/users-repository");

async function getUserBookings(req, res, next) {
  try {
    const { id } = req.auth;

    const enjoieds = await repository.getEnjoied(id);

    const enjoys = await repository.getEnjoy(id);

    res.send({ disfrutadas: enjoieds, PorDisfrutar: enjoys });
  } catch (error) {
    next(error);
  }
}

module.exports = getUserBookings;
