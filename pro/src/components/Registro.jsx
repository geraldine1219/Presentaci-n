import React, { useState } from "react";
import axios from "axios";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("user"); 

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/registrar", { nombre, correo, contraseña, rol });
      alert("Usuario registrado exitosamente");
    } catch (error) {
      console.error("Detalles del error:", error.response || error.message);
      alert(`Hubo un problema al registrar: ${error.response?.data || error.message}`);
    }
  };
  

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <input
        type="name"
        className="form-control my-2"
        placeholder="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="correo"
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
        onChange={(e) => setContraseña(e.target.value)}
      />
      <select
        className="form-control my-2"
        value={rol}
        onChange={(e) => setRol(e.target.value)}
      >
        <option value="user">Usuario</option>
        <option value="admin">Admin</option>
      </select>
      <button className="btn btn-success" onClick={handleRegister}>
        Registrar
      </button>
    </div>
  );
}

export default Registro;
