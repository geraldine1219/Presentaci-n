import React, { useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom"; // Asegúrate de importar Link


function Inicio() {
  
  
  const [correo, setCorreo] = useState("");
  const [contraseña, setcontraseña] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/registrar", {correo,contraseña});

      if (response.data.role === "admin") {
        window.location.href = "/crud"; // Redirigir al CRUD si es admin
      } else {
        window.location.href = "/producto"; // Redirigir a productos si es usuario
      }
    } catch (error) {
      setErrorMessage("Credenciales incorrectas o error en el servidor");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        className="form-control my-2"
        placeholder="Correo Electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        className="form-control my-2"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setcontraseña(e.target.value)}
      />
      
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error si existe */}

      <div>
        <button className="btn btn-primary"> <Link to="/recuperarContra">¿Olvidaste tu contraseña?</Link></button>
      </div>

      <button className="btn btn-primary" onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Inicio;
