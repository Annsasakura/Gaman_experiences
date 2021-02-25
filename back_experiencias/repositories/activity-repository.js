"use strict";

const db = require("../infrastructure/database");
const pool = db.getPool();

async function createAct(
  name_act,
  type_act,
  description_act,
  summary_act,
  places,
  price,
  d_start,
  location
) {
  const connection = await pool.getConnection();
  const query =
    "INSERT INTO  activity(name_act,type_act,description_act,summary_act,places,price,d_start,location) values (?,?,?,?,?,?,?,?)";
  const [act] = await connection.query(query, [
    name_act,
    type_act,
    description_act,
    summary_act,
    places,
    price,
    d_start,
    location,
  ]);
  connection.release();
  return act.insertId;
}

async function getActsAdmin() {
  const connection = await pool.getConnection();
  const query =
    "SELECT id_activity, name_act,DATE_FORMAT(d_start, '%d/%m/%Y') AS fecha, type_act FROM activity ORDER BY d_start ASC";
  const [act] = await connection.query(query);

  connection.release();
  return act;
}

async function getActsAdminFilter(type) {
  const connection = await pool.getConnection();
  const query =
    "SELECT id_activity, name_act, DATE_FORMAT(d_start, '%d/%m/%Y') AS fecha FROM activity WHERE type_act LIKE ? ORDER BY d_start ASC";
  const [act] = await connection.query(query, type);

  connection.release();
  return act;
}

async function getActivity(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT name_act, type_act, photo_act, description_act, summary_act, places, price, d_start AS fecha, location, photo2, photo3, photo4, photo5 FROM activity WHERE id_activity = ?";

  const [act] = await connection.query(query, id);

  connection.release();
  return act[0];
}

async function getRating(type_act) {
  const connection = await pool.getConnection();
  const query =
    "SELECT u.photo_user, c.rating, u.first_name FROM users u JOIN register_contract_activity c ON u.id = c.id_user JOIN activity a ON c.id_activity = a.id_activity WHERE a.type_act = ? AND rating IS NOT NULL LIMIT  6";

  const [rat] = await connection.query(query, type_act);

  connection.release();
  return rat;
}

async function getPlaces(id_activity) {
  const connection = await pool.getConnection();
  const query =
    "SELECT COUNT(c.id_activity) AS PlazasOcupadas, a.places - COUNT(c.id_activity) AS PlazasLibres FROM activity a LEFT JOIN register_contract_activity c ON a.id_activity = c.id_activity WHERE a.id_activity = ? GROUP BY a.id_activity";

  const [places] = await connection.query(query, id_activity);

  connection.release();
  return places[0];
}

async function getPhotoPlaces(id_activity) {
  const connection = await pool.getConnection();
  const query =
    "SELECT u.id AS id, u.photo_user AS photo FROM users u LEFT JOIN register_contract_activity c ON u.id = c.id_user  WHERE c.id_activity = ?";

  const [photos] = await connection.query(query, id_activity);

  connection.release();
  return photos;
}

async function updateAct(
  name_act,
  type_act,
  description_act,
  summary_act,
  places,
  price,
  d_start,
  location,
  id_activity
) {
  const connection = await pool.getConnection();
  const query =
    "UPDATE activity SET name_act = ?, type_act = ?, description_act = ?, summary_act = ?, places = ?, price = ?, d_start = ?, location = ? WHERE id_activity = ?";
  const [act] = await connection.query(query, [
    name_act,
    type_act,
    description_act,
    summary_act,
    places,
    price,
    d_start,
    location,
    id_activity,
  ]);

  connection.release();
  return act[0];
}

async function deleteAct(id) {
  const connection = await pool.getConnection();
  const query = "DELETE FROM activity WHERE id_activity = ?";
  const [act] = await connection.query(query, id);

  connection.release();
  return act[0];
}

async function getEmailsActivity(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT email FROM register_contract_activity R JOIN users U ON R.id_user = U.id WHERE id_activity = ?";
  const [emails] = await connection.query(query, id);

  connection.release();
  return emails;
}

async function deleteReferences(id) {
  const connection = await pool.getConnection();
  const query = "DELETE FROM register_contract_activity WHERE id_activity = ?";
  const [act] = await connection.query(query, id);

  connection.release();
  return act[0];
}

async function preContract(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT summary_act AS Resumen, name_act AS Actividad, DATE_FORMAT(d_start, '%d/%m/%Y') AS fecha, price FROM activity WHERE id_activity = ?";
  const [act] = await connection.query(query, id);

  connection.release();
  return act;
}

async function confirmContract(id_user, id_activity) {
  const connection = await pool.getConnection();
  const query =
    "INSERT INTO register_contract_activity(id_user,id_activity) values (?,?)";
  const [act] = await connection.query(query, [id_user, id_activity]);

  connection.release();
  return act;
}

async function activityBeforeToday(id) {
  const connection = await pool.getConnection();
  const query =
    "SELECT * FROM activity WHERE id_activity = ? AND d_start < current_date()";
  const [act] = await connection.query(query, id);

  connection.release();
  return act[0];
}

async function searchAct(data) {
  const connection = await pool.getConnection();

  const { location, type, direction } = data;

  // nombramos la query base
  let query =
    "SELECT name_act, photo_act,DATE_FORMAT(d_start, '%d/%m/%Y') AS fecha, id_activity FROM activity";

  //establecemos los paramaetros de busqueda
  const params = [];

  //establecemos criterio de dirección de búsqueda
  const orderDirection =
    (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

  //construimos query multibusqueda
  if (location || type) {
    //establecemos condiciones para la query
    const conditions = [];

    if (location) {
      conditions.push("location=?");
      params.push(`${location}`);
    }
    if (type) {
      conditions.push("type_act=?");
      params.push(`${type}`);
    }

    //Finalizamos construcción de la query
    query = `${query} WHERE ${conditions.join(
      ` AND `
    )}AND d_start > current_date() ORDER BY d_start ${orderDirection}`;
  } else {
    query = `${query} WHERE d_start > current_date() ORDER BY d_start ${orderDirection}`;
  }

  const [result] = await connection.query(query, params);

  connection.release();
  return result;
}

async function listTypeAct() {
  const connection = await pool.getConnection();
  const query =
    "SELECT DISTINCT type_act FROM activity WHERE d_start > current_date()";
  const [typeAct] = await connection.query(query);

  connection.release();
  return typeAct;
}

async function listLocation() {
  const connection = await pool.getConnection();
  const query =
    "SELECT DISTINCT location from activity WHERE d_start > current_date()";
  const [locations] = await connection.query(query);

  connection.release();
  return locations;
}

async function bestActivities() {
  const connection = await pool.getConnection();
  const query =
    "SELECT a.photo_act AS photo, a.name_act AS name, a.type_act AS type, a.id_activity AS id FROM activity a JOIN register_contract_activity r ON a.id_activity = r.id_activity GROUP BY r.id_activity HAVING TRUNCATE(AVG(r.rating), 1) ORDER BY TRUNCATE(AVG(r.rating), 1) DESC;";
  const [rating] = await connection.query(query);

  connection.release();
  return rating;
}

async function createPhotosAct(queryName, queryValue, id) {
  const connection = await pool.getConnection();
  const query = `UPDATE activity SET ${queryName} = ? WHERE id_activity = ?`;
  const [photos] = await connection.query(query, [queryValue, id]);

  connection.release();
  return photos;
}

async function getImages(column, id) {
  const connection = await pool.getConnection();
  const query = `SELECT ${column} FROM activity WHERE id_activity = ?`;
  const [img] = await connection.query(query, id);

  connection.release();
  return img[0][column];
}

module.exports = {
  createAct,
  getActsAdmin,
  getActsAdminFilter,
  getActivity,
  updateAct,
  deleteAct,
  getRating,
  getPlaces,
  preContract,
  confirmContract,
  activityBeforeToday,
  getEmailsActivity,
  deleteReferences,
  searchAct,
  listTypeAct,
  listLocation,
  bestActivities,
  createPhotosAct,
  getImages,
  getPhotoPlaces,
};
