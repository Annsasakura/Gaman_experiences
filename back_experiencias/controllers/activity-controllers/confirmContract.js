"use strict";

const userRepository = require("../../repositories/users-repository");
const activityRepository = require("../../repositories/activity-repository");

async function confirmContract(req, res, next) {
  try {
    const { actId } = req.params;
    const { id } = req.auth;

    //comprobar que existe la actividad
    const act = await activityRepository.getActivity(actId);
    if (!act) {
      const error = new Error("Actividad no encontrada");
      error.status = 404;
      throw error;
    }

    // Comprobamos que la actividad no ha pasado de fecha
    const before = await activityRepository.activityBeforeToday(actId);
    if (before) {
      const error = new Error("Actividad no disponible, ya ha pasado la fecha");
      error.status = 400;
      throw error;
    }

    //comprobar si existe contrato
    const existContract = await userRepository.getEnjoyByActId(id, actId);
    if (existContract) {
      const error = new Error("Ya tienes contratada esta actividad");
      error.status = 400;
      throw error;
    }

    //Comprobar que el usuario tiene el DNI
    const chekingDni = await userRepository.checkDni(id);

    if (!chekingDni) {
      const error = new Error("Para contratar necesitas introducir tu Dni");
      error.status = 400;
      throw error;
    }

    await activityRepository.confirmContract(id, actId);

    res.send({ message: "Actividad contrada con éxito!" });
  } catch (error) {
    next(error);
  }
}

module.exports = confirmContract;
