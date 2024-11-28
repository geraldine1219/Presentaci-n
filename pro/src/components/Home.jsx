import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
    return (
        <div className="container">
          <h1>Bienvenido al Sistema de Devolución de Uniformes Escolares</h1><p>
            <h3>Este es el sistema para gestionar las devoluciones de uniformes escolares.</h3>
          </p>
    
    
          <div>
            <h1>Opciones disponibles:</h1>
            <ul>
              <li>
                <h1><Link to="/Registro">Registrarse</Link></h1>
              </li>
              <li>
                <h3><Link to="/Inicio">Iniciar Sesión</Link></h3>
              </li>
            </ul>
          </div>
        </div>
      );
    }

export default Home;
