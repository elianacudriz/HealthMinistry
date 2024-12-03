import React, { useState } from 'react';
import './servicios.css'
import Cookies from 'js-cookie';


function FormularioServicio() {

    var userid = 0;
    const clearCookies = () => {
        const allCookies = Cookies.get(); // Obtener todas las cookies como un objeto { nombre: valor }
        console.log(allCookies);
        // Iterar sobre las claves del objeto (nombres de las cookies)
        Object.keys(allCookies).forEach(cookieName => {
          Cookies.remove(cookieName); // Eliminar cada cookie por su nombre
        });
      };

    fetch('http://localhost:5000/check-session', {
        method: 'GET',
        credentials: 'include'  // Incluir las cookies en la solicitud
    })
    .then(response => {
        if (response.status === 401) {
            alert("No tiene una sesion iniciada");
                window.location.href = '/login'; // Redirige a la página de login
            return; // Salir de la promesa si el status es 401
        }
        return response.json();  // Continuar procesando la respuesta si no es 401
    })
        .then(data => {
            console.log(data);
           userid = data.user.id;
        })
        .catch(error => {
           

            console.error('Error:', error);
        });

    const serviciosDisponibles = [
        { id: 1, nombre: 'Consulta psicológica- Ansiedad' },
        { id: 2, nombre: 'Consulta de transtorno de sueño' },
        { id: 3, nombre: 'Consulta psicológica- Depresión' },
        { id: 4, nombre: 'Osteoporosis' },
        { id: 5, nombre: 'Neumonía' },
        { id: 6, nombre: 'Cuidos críticos en adulto mayor' },
        { id: 7, nombre: 'Asesoría para comer sano' },
        { id: 8, nombre: 'Infección urinaria' },

      ];

    const [servicio, setServicio] = useState('');
    const [fechaServicio, setFechaServicio] = useState('');

    const handleLogout = async (e) => {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'GET',
            credentials: 'include',  // Incluir las cookies en la solicitud

            headers: {
              'Content-Type': 'application/json',
            },
          });// Aquí puedes eliminar la cookie de sesión o hacer la llamada al backend para cerrar la sesión
          const result = await response.json();
          if (response.ok) {
            alert(result.message);
            clearCookies();
            window.location.href = 'http://localhost:5500/HTML/index.html'; // Redirige a la página de login
            
          } else {
            alert('Error: ' + result.error);
          }
      };
  
    const handleSubmit = async (e) => {

       

      e.preventDefault();
  
      const data = {
        userid,
        servicio,
        fecha_servicio: fechaServicio
      };
  
      try {
        const response = await fetch('http://localhost:5000/servicio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          if (result.redirectTo) {
            window.location.href = result.redirectTo; // Redirect to the login page
        }
          
        } else {
          alert('Error: ' + result.error);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:',error);
        alert('Hubo un problema al registrar el usuario.');
      }
    };
  
    return (
        
      <div className="content">
        <h1 id="registro">Formulario de Registro de servicios Seventh Day Health</h1>
        <h3 className="centered-text">
            Aquí podrás regitrar los sevicios a los que vas a acceder</h3>
        <div className="form-container">
          <form id="formulario" onSubmit={handleSubmit}>
            <div className="column-wrapper">
              <div className="form-control">
                <label htmlFor="servicio">* Servicio</label>
                <select
            id="servicio"
            name="servicio"
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
          >
            <option value="">Seleccione un servicio</option>
            {serviciosDisponibles.map((servicio) => (
              <option key={servicio.id} value={servicio.nombre}>
                {servicio.nombre}
              </option>
            ))}
          </select>
                <small>Error: Es necesario digitar su servicio</small>
              </div>
              <div className="form-control">
                <label htmlFor="fecha_servicio">* Fecha del Servicio</label>
                <input
                  type="date"
                  id="fecha_servicio"
                  name="fecha_servicio"
                  value={fechaServicio}
                  onChange={(e) => setFechaServicio(e.target.value)}
                />
                <small>Error: Es necesaria la fecha</small>
              </div>
            </div>

  
            <div className="form-control">
              <button type="submit" className="btn-submit">
                Enviar
              </button>
            </div>
            <div className="form-control">
            <button type="button" className="btn-submit" onClick={handleLogout}>
            Salir
          </button>
              
            </div>

  
            <p id="Exito" style={{ display: 'none' }}>¡Registro  de servicio exitoso!</p>
          </form>
        </div>
      </div>
    );
  }
  
  export default FormularioServicio;