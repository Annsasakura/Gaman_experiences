"use strict";
const register = require("./register");
const login = require("./login");
const getUserById = require("./getUserById");
const editUser = require("./editUser");
const getUserBookings = require("./getUserBookings");
const getUserRatings = require("./getUserRatings");
const rate = require("./rate");
const validateUser = require("./validateUser");

module.exports = {
  register,
  login,
  getUserById,
  editUser,
  getUserBookings,
  getUserRatings,
  rate,
  validateUser,
};
