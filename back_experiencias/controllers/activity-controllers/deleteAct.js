"use strict";
const Joi = require("joi");
const repository = require("../../repositories/activity-repository");
const mailgun = require("mailgun-js");
const { API_KEY_MAILGUN, DOMAIN_MAILGUN } = process.env;

async function deleteAct(req, res, next) {
  try {
    const { actId } = req.params;
    const schema = Joi.number().positive();
    await schema.validateAsync(actId);

    //comprobar que existe la actividad
    const act = await repository.getActivity(actId);
    if (!act) {
      const error = new Error("Actividad no encontrada");
      error.status = 404;
      throw error;
    }

    //comprobar si la actividad ha pasado de fecha
    const enjoyed = await repository.activityBeforeToday(actId);

    //recuperamos emails de los usuarios inscritos en la actividad
    const emails = await repository.getEmailsActivity(actId);

    //si hay usuarios en la actividad que aun no se ha realizado se envia email para avisar
    if (!enjoyed && emails) {
      //TODO esta parte recoge los emails del array de objetos y los tranforma en un string para poder pasarlo a los destinatarios de mailgun
      // const arrayDeEmails = [];
      // for (const iterator of emails) {
      //   arrayDeEmails.push(iterator.email);
      // }
      // const arrayDeEmailsToString = arrayDeEmails.toString();

      //enviamos email a los usuarios para avisar de que la act se ha cancelado
      const mg = mailgun({ apiKey: API_KEY_MAILGUN, domain: DOMAIN_MAILGUN });
      const data = {
        from: "Excited User <me@samples.mailgun.org>",
        to: "nuriarique@gmail.com, martinvarod@gmail.com ",
        subject: `${act.name_act} -Cancelación de actividad :(`,
        text:
          "Sentimos comunicarle que la actividad que ha contradado ha sido cancelada.",
      };
      await mg.messages().send(data);
    }

    //borrar referencias
    await repository.deleteReferences(actId);

    //borrar actividad
    await repository.deleteAct(actId);

    res.send({ mensaje: "Activida borrada con exito" });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteAct;
