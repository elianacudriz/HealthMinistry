import React, { useState } from 'react';
import './login.css'
import './estiloglobal.css'

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ usuario, password }),
              credentials: 'include' // Incluye cookies
          });

          const data = await response.json();
          alert(data.message);

          if (response.status === 200) {
              // Redirige al usuario si la autenticación es exitosa
              window.location.href = '/servicio';
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Hubo un problema con la autenticación');
      }
  };

  return (
      <section className="login-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
              <div className="form-control">
                  <label htmlFor="usuario">Usuario:</label>
                  <input
                      type="text"
                      id="usuario"
                      placeholder="Ingresa tu usuario"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      required
                  />
              </div>
              <div className="form-control">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                      type="password"
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </div>
              <button type="submit" className="btn-submit">
                  Iniciar Sesión
              </button>
          </form>
      </section>
  );
}

export default Login;