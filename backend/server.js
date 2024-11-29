const express = require('express');
const mysql = require('mysql2/promise');
const md5 = require('md5');
const cors = require('cors');

const app = express();
const port = 5000;
const fechaRegistro = new Date().toISOString();

app.use(express.json());
app.use(cors());

let db;

async function startServer() {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root', // Cambia esto si tu usuario es diferente
      password: '', // Cambia esto si tienes contraseña
      database: 'DB_ministerioSalud',
    });
    console.log('Conectado a MySQL');

    app.post('/register', async (req, res) => {

      if (!nombre || !apellido || !correo || !fecha_nacimiento || !contrasena) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      const contrasena_hash = md5(contrasena);

      const query =
        'INSERT INTO usuarios (nombre, apellido, correo, fecha_nacimiento, contrasena_hash, fecha_registro) VALUES (?, ?, ?, ?, ?)';

      try {
        const [result] = await db.execute(query, [
          nombre,
          apellido,
          correo,
          fecha_nacimiento,
          contrasena_hash,
          fechaRegistro
        ]);
        res.status(200).json({ message: 'Usuario registrado exitosamente' });
      } catch (err) {
        console.error('Error al registrar el usuario:', err);
        res.status(500).json({ error: 'Error al registrar el usuario' });
      }
    });

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
}

startServer();

