const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // Para encriptar y comparar contraseñas
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambiar por tu usuario de MySQL
  password: "", // Cambiar por tu contraseña de MySQL
  database: "proyecto", // Cambiar por el nombre de tu base de datos
});

// Verificar la conexión
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Endpoint para registrar usuarios
app.post("/registrar", async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const sql = "INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, correo, hashedPassword, rol], (err, result) => {
      if (err) {
        console.error("Error al registrar el usuario:", err);
        res.status(500).send("Error al registrar el usuario");
        return;
      }
      res.status(200).send("Usuario registrado exitosamente");
    });
  } catch (err) {
    console.error("Error en el proceso de registro:", err);
    res.status(500).send("Error interno del servidor");
  }
});

// Endpoint para iniciar sesión
app.post("/iniciar-sesion", (req, res) => {
  const { correo, contraseña } = req.body;

  // Consultar si el correo existe
  const sql = "SELECT * FROM usuarios WHERE correo = ?";
  db.query(sql, [correo], async (err, results) => {
    if (err) {
      console.error("Error al buscar el usuario:", err);
      res.status(500).send("Error en el servidor");
      return;
    }

    // Verificar si el usuario existe
    if (results.length === 0) {
      res.status(404).send("Usuario no encontrado");
      return;
    }

    const usuario = results[0];

    try {
      // Comparar la contraseña ingresada con la almacenada
      const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

      if (!isMatch) {
        res.status(401).send("Contraseña incorrecta");
        return;
      }

      // Responder con los datos del usuario si las credenciales son correctas
      res.status(200).send({
        mensaje: "Inicio de sesión exitoso",
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol,
        },
      });
    } catch (err) {
      console.error("Error al comparar contraseñas:", err);
      res.status(500).send("Error interno del servidor");
    }
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
