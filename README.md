# HealthMinistry

* Este es el proyecto en el cual se generan los modulos en react (Registro, Login, Servicios) los cuales interactuan directamente con la base de datos MySQL guardando y consultando datos. Se manejan y controlan las sesiones al respecto. La idea es que después del registro inicien sesion para poder agendar servicios de salud. si no estas logueados no podrán acceder a esta funcionalidad.

Este es un proyecto extension del proyecto en el siguiente repositorio, bajar los cambios de la rama production. 

`https://github.com/everth0312/SeventhDayHealth/tree/production`

Como paso inicial se debe tener instalado MySQL y posterior a eso se debe correr el siguiente script
```

CREATE DATABASE IF NOT EXISTS DB_ministerioSalud;

USE DB_ministerioSalud;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    fecha_registro DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicios (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    fecha_servicio DATE NOT NULL,
    asistio BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

```

Posterior a eso se debe clonar el proyecto y abrir cualquier editor de texto de preferencia.

Debo primero correr en la terminal npm install para que se instalen todas las librerias del proyecto.

luego se debe correr npm start en la terminal en cada una de las capetas del proyecto, la carpeta backend que correr el archivo server.js es el que tiene las conecciones con base de datos y la carpeta healthministrymodules en el que se corre el cliente en react.

