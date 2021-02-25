"use stric";
const repository = require("../../repositories/activity-repository");

async function home(req, res, next) {
  try {
    const activities = await repository.bestActivities();

    const limitActivities = activities.filter((act, index) => index < 4);

    res.send(limitActivities);
  } catch (error) {
    next(error);
  }
}

module.exports = home;
