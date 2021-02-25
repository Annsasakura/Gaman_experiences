"use stric";

function errors(error, req, res, next) {
  console.log(error);
  res.status(error.status || 500).send({
    message: error.message,
  });
}

module.exports = errors;
