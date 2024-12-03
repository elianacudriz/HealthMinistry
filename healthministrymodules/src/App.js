
import FormularioRegistro from './miscomponentes/formulario';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './miscomponentes/login';
import FormularioServicio from './miscomponentes/servicios';
import './miscomponentes/formulario.css'
import './miscomponentes/login.css'



const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">FORMULARIO</Link> | <Link to="/login">LOGIN</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FormularioRegistro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/servicio" element={<FormularioServicio />} />
      </Routes>
    </Router>
  );
};

export default App;

