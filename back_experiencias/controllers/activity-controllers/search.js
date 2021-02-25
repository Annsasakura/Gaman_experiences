"use strict";

const repository = require("../../repositories/activity-repository");

async function search(req, res, next) {
  try {
    //obtener criterios de busqueda
    const { location, type, direction } = req.query;
    const datoscomoparametrso = { location, type, direction };

    const result = await repository.searchAct(datoscomoparametrso);
    const types = await repository.listTypeAct();
    const locations = await repository.listLocation();
    res.send({ data: result, type: types, location: locations });
  } catch (error) {
    next(error);
  }
}

module.exports = search;
