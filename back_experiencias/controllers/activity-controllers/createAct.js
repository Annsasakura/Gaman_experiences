"use strict";
const Joi = require("joi").extend(require("@joi/date"));
const repository = require("../../repositories/activity-repository");
const helpers = require("../../helpers/helpers");
const { validPhotoNames } = require("./shared");

async function createAct(req, res, next) {
  try {
    const schema = Joi.object({
      name_act: Joi.string().required(),
      type_act: Joi.string().required(),
      description_act: Joi.string().required(),
      summary_act: Joi.string().required(),
      places: Joi.number().positive().min(1).required(),
      price: Joi.number().positive().min(1).precision(2).required(),
      d_start: Joi.date().format("YYYY-MM-DD").required(),
      location: Joi.string().required(),
    });

    await schema.validateAsync(req.body);

    const {
      name_act,
      type_act,
      description_act,
      summary_act,
      places,
      price,
      d_start,
      location,
    } = req.body;

    const act = await repository.createAct(
      name_act,
      type_act,
      description_act,
      summary_act,
      places,
      price,
      d_start,
      location
    );

    if (req.files) {
      const fotos = Object.entries(req.files);

      if (fotos.length > 5) {
        const error = new Error(
          "Superado el número de fotos que se pueden subir. Máximo 5 fotos."
        );
        error.status = 500;
        throw error;
      }

      for (const [name, value] of fotos) {
        if (validPhotoNames.includes(name)) {
          const saveFileName = await helpers.tuneaGuardarEnCarpetaDevuelveRuta(
            value,
            1024
          );
          await repository.createPhotosAct(name, saveFileName, act);
        }
      }
    }

    res.send({ id: act });
  } catch (error) {
    next(error);
  }
}

module.exports = createAct;
