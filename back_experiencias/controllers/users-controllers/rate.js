"use strict";
const Joi = require("joi");
const uRepository = require("../../repositories/users-repository");
const aRepository = require("../../repositories/activity-repository");

async function rate(req, res, next) {
  try {
    const { actId, rating } = req.params;
    const { id } = req.auth;
    const schema = Joi.number().min(1).max(5).integer().required();
    await schema.validateAsync(rating);

    //comprobar si el usuario tiene la actividad contratada
    const getContract = await uRepository.getEnjoyByActId(id, actId);
    if (!getContract) {
      const error = new Error("No tienes contratada esta actividad.");
      error.status = 400;
      throw error;
    }

    //comprobar si la act ya esta valorada
    if (getContract.rating) {
      const error = new Error("La actividad ya está valorada🖕🏼");
      error.status = 400;
      throw error;
    }

    //comprobar si ya se ha realizado la actividad
    const enjoied = await aRepository.activityBeforeToday(actId);

    if (!enjoied) {
      const error = new Error(
        "Aun no se puede realizar la valoración, no se ha realizado la actividad"
      );
      error.status = 400;
      throw error;
    }

    await uRepository.insertRate(rating, id, actId);

    res.send("Actividad valorada con exito");
  } catch (error) {
    next(error);
  }
}

module.exports = rate;
