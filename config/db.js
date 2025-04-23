// config/db.js
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost", // Tu host de MariaDB
  user: "root", // Tu usuario de MariaDB
  password: "root", // Tu contraseña de MariaDB
  database: "stockSystem", // El nombre de tu base de datos
};

const pool = mysql.createPool(dbConfig);

export default pool;
