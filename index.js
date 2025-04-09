require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Verificar conexión
db.connect(err => {
  if (err) {
    console.error('❌ Error de conexión a la BBDD:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

// Ruta para obtener todas las actividades
app.get('/actividades', (req, res) => {
  const sql = 'SELECT * FROM actividades';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error al obtener actividades' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});
