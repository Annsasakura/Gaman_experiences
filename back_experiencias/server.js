"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const { SERVER_PORT, NODE_ENV } = process.env;

const { usersControllers, activityControllers } = require("./controllers");
const middlewares = require("./middlewares");

//declaraciones
const app = express();
app.use(cors());
// enable files upload
app.use(fileUpload());

app.use("/uploads", express.static("public"));

//Middleware de log a consola en modo desenvolver
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rutas usuario
app.post("/register", usersControllers.register);
app.put("/validate", usersControllers.validateUser);
app.post("/login", usersControllers.login);
app.get("/user/data", middlewares.validateAuth, usersControllers.getUserById);
app.put("/user/data", middlewares.validateAuth, usersControllers.editUser);
app.get(
  "/user/booking",
  middlewares.validateAuth,
  usersControllers.getUserBookings
);
app.get(
  "/user/rate",
  middlewares.validateAuth,
  usersControllers.getUserRatings
);
app.put(
  "/user/rate/:actId/:rating",
  middlewares.validateAuth,
  usersControllers.rate
);

//rutas admin
app.get(
  "/admin/activities",
  middlewares.validateAuth,
  middlewares.isAdmin,
  activityControllers.getActivitiesAdmin
);
app.post(
  "/admin/createAct",
  middlewares.validateAuth,
  middlewares.isAdmin,
  activityControllers.createAct
);
app.put(
  "/admin/:actId",
  middlewares.validateAuth,
  middlewares.isAdmin,
  activityControllers.updateAct
);
app.delete(
  "/admin/:actId",
  middlewares.validateAuth,
  middlewares.isAdmin,
  activityControllers.deleteAct
);

//rutas actividad
app.get("/", activityControllers.home);
app.get("/search", activityControllers.search);
app.get("/activity/:actId", activityControllers.getActivity);
app.get(
  "/activity/:actId/contract",
  middlewares.validateAuth,
  activityControllers.contractActivity
);
app.post(
  "/activity/:actId/contract",
  middlewares.validateAuth,
  activityControllers.confirmContract
);

//middleware gestión de errores
app.use(middlewares.errors);

//middleware página no encontrada
app.use(middlewares.notFound);

//listener
app.listen(SERVER_PORT, () => {
  console.log(`Escuchando el servidor ${SERVER_PORT}`);
});
