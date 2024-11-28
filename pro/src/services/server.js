const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost', // Cambia según tu configuración
  user: 'root', // Usuario de MySQL
  password: '', // Contraseña de MySQL
  database: 'proyecto', // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para procesar devoluciones
app.post('/api/returns', (req, res) => {
  const devoluciones = req.body.devoluciones;

  // Procesar cada devolución
  const sql = 'INSERT INTO devoluciones (user_id, product_id, quantity) VALUES (?, ?, ?)';
  devoluciones.forEach((devolucion) => {
    db.query(sql, [devolucion.user_id, devolucion.product_id, devolucion.quantity], (err) => {
      if (err) {
        console.error('Error al insertar la devolución:', err.message);
        return res.status(500).send('Error al procesar la devolución.');
      }
    });
  });

  res.send('Devoluciones procesadas exitosamente.');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
