"use strict";

const Joi = require("joi").extend(require("@joi/date"));
const repository = require("../../repositories/activity-repository");
const helpers = require("../../helpers/helpers");

async function updateAct(req, res, next) {
  try {
    const { actId } = req.params;
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

    // Validaciones
    const schema = Joi.object({
      actId: Joi.number().positive(),
      name_act: Joi.string().required(),
      type_act: Joi.string().required(),
      description_act: Joi.string().required(),
      summary_act: Joi.string().required(),
      places: Joi.number().positive().min(1).required(),
      price: Joi.number().positive().min(1).precision(2).required(),
      d_start: Joi.date().format("YYYY-MM-DD").required(),
      location: Joi.string().required(),
    });

    await schema.validateAsync({
      actId,
      name_act,
      type_act,
      description_act,
      summary_act,
      places,
      price,
      d_start,
      location,
    });

    // Buscar la actividad
    const act = await repository.getActivity(actId);
    if (!act) {
      const error = new Error("actividad no encontrada");
      error.status = 404;
      throw error;
    }

    // Actualizamos en la bbdd
    await repository.updateAct(
      name_act,
      type_act,
      description_act,
      summary_act,
      places,
      price,
      d_start,
      location,
      actId
    );

    //Actualizmos las fotos
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
        const saveFileName = await helpers.tuneaGuardarEnCarpetaDevuelveRuta(
          value,
          1024
        );

        const oldPhoto = await repository.getImages(name, actId);

        if (oldPhoto) {
          await helpers.deletePhoto(oldPhoto);
        }

        await repository.createPhotosAct(name, saveFileName, actId);
      }
    }

    const actUpdated = await repository.getActivity(actId);

    res.send({ actUpdated });
  } catch (error) {
    next(error);
  }
}

module.exports = updateAct;
