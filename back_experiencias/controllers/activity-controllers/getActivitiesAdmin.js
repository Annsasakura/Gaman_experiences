"use strict";
const repository = require("../../repositories/activity-repository");

async function getActivitiesAdmin(req, res, next) {
  try {
    const { type } = req.query;

    const types = await repository.listTypeAct();
    if (type) {
      const activities = await repository.getActsAdminFilter(type);
      res.send({ activities, types });
    } else {
      const activities = await repository.getActsAdmin();
      res.send({ activities, types });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = getActivitiesAdmin;
