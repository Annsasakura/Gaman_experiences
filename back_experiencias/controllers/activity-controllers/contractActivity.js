"use strict";
const Joi = require("joi");
const repository = require("../../repositories/activity-repository");

async function contractActivity(req, res, next) {
  try {
    const { actId } = req.params;
    const schema = Joi.number().positive();
    await schema.validateAsync(actId);

    //comprobar que existe la actividad
    const act = await repository.getActivity(actId);
    if (!act) {
      const error = new Error("Actividad no encontrada");
      error.status = 404;
      throw error;
    }

    // Comprobamos que la actividad no ha pasado de fecha
    const before = await repository.activityBeforeToday(actId);
    if (before) {
      const error = new Error("Actividad no disponible, ya ha pasado la fecha");
      error.status = 400;
      throw error;
    }

    //Si estan todas las plazas ocupadas no se puede contratar
    const places = await repository.getPlaces(actId);
    if (places.PlazasLibres === 0) {
      const error = new Error("No quedan plazas libres");
      error.status = 400;
      throw error;
    }

    const [resumen] = await repository.preContract(actId);
    res.send({ resumen });
  } catch (error) {
    next(error);
  }
}

module.exports = contractActivity;
