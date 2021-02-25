"use stric";
const createAct = require("./createAct");
const getActivitiesAdmin = require("./getActivitiesAdmin");
const getActivity = require("./getActivity");
const updateAct = require("./updateAct");
const deleteAct = require("./deleteAct");
const contractActivity = require("./contractActivity");
const confirmContract = require("./confirmContract");
const search = require("./search");
const home = require("./home");

module.exports = {
  createAct,
  getActivitiesAdmin,
  getActivity,
  updateAct,
  deleteAct,
  contractActivity,
  confirmContract,
  search,
  home,
};
