import React, { useState } from 'react';
import './formulario.css'

function FormularioRegistro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmContraseña, setConfirmContraseña] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (contrasena !== confirmContraseña) {
        alert('Las contraseñas no coinciden');
        return;
      }
  
      const data = {
        nombre,
        apellido,
        correo,
        fecha_nacimiento: fechaNacimiento,
        contrasena,
      };
  
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
        } else {
          alert('Error: ' + result.error);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un problema al registrar el usuario.');
      }
    };
  
    return (
      <div className="content">
        <h1 id="registro">Formulario de Registro Seventh Day Health</h1>
        <h3 >Aquí podrás registrarte para poder acceder a todos los servicios de salud que ofrecemos</h3>
        <div className="form-container">
          <form id="formulario" onSubmit={handleSubmit}>
            <div className="column-wrapper">
              <div className="form-control">
                <label htmlFor="nombre">* Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Digite su nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <small>Error: Es necesario digitar su nombre</small>
              </div>
  
              <div className="form-control">
                <label htmlFor="apellido">* Apellidos</label>
                <input
                  type="text"
                  id="apellido"
                  placeholder="Digite sus apellidos"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                <small>Error: Es necesario digitar sus apellidos</small>
              </div>
            </div>
  
            <div className="column-wrapper">
              <div className="form-control">
                <label htmlFor="correo">* Correo electrónico</label>
                <input
                  type="email"
                  id="correo"
                  placeholder="Digite su correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <small>Error: El correo no es válido</small>
              </div>
  
              <div className="form-control">
                <label htmlFor="date">* Fecha de nacimiento</label>
                <input
                  type="date"
                  id="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
                <small>Error: Es necesaria la fecha de nacimiento</small>
              </div>
            </div>
  
            <div className="column-wrapper">
              <div className="form-control">
                <label htmlFor="contraseña">* Contraseña</label>
                <input
                  type="password"
                  id="contraseña"
                  placeholder="Digite su contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
                <small>Error: La contraseña debe contener al menos 8 caracteres</small>
              </div>
  
              <div className="form-control">
                <label htmlFor="confirmContraseña">* Confirmar contraseña</label>
                <input
                  type="password"
                  id="confirmContraseña"
                  placeholder="Confirme su contraseña"
                  value={confirmContraseña}
                  onChange={(e) => setConfirmContraseña(e.target.value)}
                />
                <small>Error: Las contraseñas no coinciden</small>
              </div>
            </div>
  
            <div className="form-control">
              <button type="submit" className="btn-submit">
                Enviar
              </button>
            </div>
  
            <p id="Exito" style={{ display: 'none' }}>¡Registro exitoso!</p>
          </form>
          <p id="parrafo">Los campos marcados con * son obligatorios</p>
        </div>
      </div>
    );
  }
  
  export default FormularioRegistro;