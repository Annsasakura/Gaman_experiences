"use strict";

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function validateAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error("Error: usuario no registrado");
      error.status = 401;
      // res.redirect("http://localhost:8081/login");
      throw error;
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { id, name, role } = decodedToken;

    req.auth = { id, name, role };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validateAuth;
