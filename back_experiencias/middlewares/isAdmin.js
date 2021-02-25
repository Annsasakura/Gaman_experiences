"use strict";

function isAdmin(req, res, next) {
  if (req.auth.role === "A") {
    return next();
  } else {
    const error = new Error("No eres administrador");
    error.status = 403;
    next(error);
  }
}
module.exports = isAdmin;
