"use strict";

const { API_KEY_MAILGUN, DOMAIN_MAILGUN, UPLOAD_URL } = process.env;
const mailgun = require("mailgun-js");
const path = require("path");
const fs = require("fs-extra");
const sharp = require("sharp");
const uuid = require("uuid");

const imageUploadPath = path.join(__dirname, UPLOAD_URL);

async function sendEmail(subject, text) {
  try {
    const mg = mailgun({ apiKey: API_KEY_MAILGUN, domain: DOMAIN_MAILGUN });
    const data = {
      from: "Excited User <me@samples.mailgun.org>",
      to: "nuriarique@gmail.com, martinvarod@gmail.com ",
      subject: subject,
      text: text,
      html: `<h1>Experiencias </h1>
      <p>${text}</p>`,
    };
    await mg.messages().send(data);
  } catch (error) {
    const e = new Error("error enviar email");
    e.status = 500;
    throw e;
  }
}

async function tuneaGuardarEnCarpetaDevuelveRuta(uploadPhoto, width) {
  if (uploadPhoto.size > 3000000) {
    const error = new Error(
      "Imagen demasiado grande, por favor selecciona otra imagen"
    );
    error.status = 400;
    throw error;
  }

  // Asegurarse de que la ruta existe
  await fs.ensureDir(imageUploadPath);

  //generar un nombre único
  const saveFileName = `${uuid.v4()}.jpg`;

  //Procesar la imagen
  const finalImage = sharp(uploadPhoto.data);

  const imageInfo = await finalImage.metadata();

  if (imageInfo.width > width) {
    finalImage.resize(width);
  }

  // guardar imagen el la carpeta
  await finalImage.toFile(path.join(imageUploadPath, saveFileName));

  return saveFileName;
}

async function deletePhoto(image) {
  await fs.unlink(path.join(imageUploadPath, image));
}
module.exports = { sendEmail, tuneaGuardarEnCarpetaDevuelveRuta, deletePhoto };
