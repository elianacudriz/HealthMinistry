const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const md5 = require('md5');
const app = express();
const session = require('express-session');
const port = 5000;
// Middleware
app.use(express.json());

const fechaRegistro = new Date(); // Permite capturar la fecha actual
const fechaServicio = new Date(); // Permite capturar la fecha actual

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


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

    app.use(session({
      secret: 'mi_secreto_super_seguro', // Llave para firmar cookies
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
          httpOnly: true,  // Mayor seguridad para evitar acceso del lado del cliente
          secure: false,   // Cambia a `true` si usas HTTPS
          sameSite: 'lax'  // Permite enviar cookies en solicitudes de origen cruzado
      }
  }));

    app.post('/register', async (req, res) => {
      const { nombre, apellido, correo, fecha_nacimiento, contrasena } = req.body;
      if (!nombre || !apellido || !correo || !fecha_nacimiento || !contrasena) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      const contrasena_hash = md5(contrasena);

      const query = 'INSERT INTO usuarios (nombre, apellido, correo, fecha_nacimiento, contrasena_hash, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)';

      try {
        const year = fechaRegistro.getFullYear();
        const month = String(fechaRegistro.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(fechaRegistro.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        const [result] = await db.execute(query,[nombre, apellido, correo, fecha_nacimiento, contrasena_hash, formattedDate]);
        res.status(200).json({ message: 'Usuario registrado exitosamente',
                              redirectTo: '/login' });
      } catch (err) {
        console.error('Error al registrar el usuario:', err.message, err.sql);
        res.status(500).json({ error: 'No se pudo registrar el usuario. Intente nuevamente.' });        
      }
    });

    app.post('/login', async (req, res) => {
      
      const { usuario,password } = req.body;
      if (!usuario || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
      const contrasena_hash = md5(password);

      try {
        // Consulta a la base de datos
        const [rows] = await db.execute(
            'SELECT * FROM usuarios WHERE correo = ? AND contrasena_hash = ?',
            [usuario, contrasena_hash]
        );

        // Verifica si se encontró un usuario
        if (rows.length > 0) {
          req.session.userId = rows[0].id;
        req.session.username = rows[0].username;
        return res.status(200).json({ success: true, message: 'Sesión iniciada exitosamente' ,
          user: { id: rows[0].id, username: rows[0].username } });
        } else {
            return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al verificar credenciales:', error);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    } 
    });

    app.get('/logout', (req, res) => {
      req.session.destroy((err) => {
          if (err) {
              return res.status(500).json({ message: 'Error al cerrar sesión' });
          }
          res.clearCookie('connect.sid');
          res.clearCookie('connect.sid', {
            path: '/', // Asegúrate de que el path coincida
            domain: 'localhost', // Si has especificado un dominio al establecer la cookie
          });
          res.json({ message: 'Sesión cerrada exitosamente' });
      });
  });

  app.get('/check-session', (req, res) => {
    if (req.session.userId) {
        // Si la sesión contiene un `userId`, la cookie es válida
        res.json({
            message: 'La sesión es válida',
            user: {
                id: req.session.userId,
                username: req.session.username
            }
        });
    } else {
        // Si no existe el `userId`, la cookie no es válida o ha expirado
        res.status(401).json({ message: 'Sesión no válida o expirada' });
    }
});

app.post('/servicio', async (req, res) => {
  const { userid, servicio, fecha_servicio } = req.body;
  if (!userid || !servicio || !fecha_servicio) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO servicios (usuario_id, servicio, fecha_servicio, asistio) VALUES (?, ?, ?, ?)';

  try {

    const [result] = await db.execute(query,[userid, servicio, fecha_servicio, false]);
    res.status(200).json({ message: 'Servicio Registrado Exitosamente',
                          redirectTo: '/servicio' });
  } catch (err) {
    console.error('Error al registrar el servicio:', err.message, err.sql);
    res.status(500).json({ error: 'No se pudo registrar el servicio. Intente nuevamente.' });        
  }
});

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // cuando el proceso falla la aplicacion finaliza o se desconecta el servidor
  }
}

startServer();


