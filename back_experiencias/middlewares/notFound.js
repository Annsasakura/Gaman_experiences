"use strict";

function notFound(req, res) {
  res.status(404).send({
    message: "Not found",
  });
}

module.exports = notFound;
