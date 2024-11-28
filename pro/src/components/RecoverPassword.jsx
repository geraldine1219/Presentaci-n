import React, { useState } from "react";
import axios from "../services/api";

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRecoverPassword = async () => {
    try {
      await axios.post("/recover-password", { email });
      setMessage("Se ha enviado un correo para recuperar tu contraseña.");
    } catch (error) {
      console.error("Error al recuperar la contraseña:", error);
      setMessage("Hubo un problema al procesar tu solicitud.");
    }
  };

  return (
    <div className="container">
      <h2>Recuperar Contraseña</h2>
      <h5><p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p></h5>
      <input
        type="email"
        className="form-control my-2"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleRecoverPassword}>
        Recuperar Contraseña
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default RecoverPassword;
