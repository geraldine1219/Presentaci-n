const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "localhost", // Cambia esto si tu base de datos está en otro servidor
  user: "root",      // Usuario de MySQL
  password: "", // Contraseña de MySQL
  database: "proyecto", // Nombre de la base de datos
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Rutas CRUD

// Obtener todos los usuarios
app.get("/crud", (req, res) => {
  const sql = "SELECT * FROM crud";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Agregar un usuario
app.post("/servidor", (req, res) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO crud (id,correo,contraseña) VALUES (?, ?,?)";
  db.query(sql, [id,correo,contraseña], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId,id,correo,contraseña });
  });
});

// Editar un usuario
app.put("/servidor/:id", (req, res) => {
  const {correo,contraseña } = req.body;
  const { id } = req.params;
  const sql = "UPDATE crud SET correo = ?, contraseña = ? WHERE id = ?";
  db.query(sql, [id,correo,contraseña], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ id,correo,contraseña });
  });
});

// Eliminar un usuario
app.delete("/servidor/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM crud WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Usuario eliminado" });
  });
});

// Iniciar el servidor
app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
