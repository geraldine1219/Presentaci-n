import React, { useState } from "react";
import axios from "axios";

const DevolucionUniformes = () => {
  const [codigoFactura, setCodigoFactura] = useState("");
  const [detallesFactura, setDetallesFactura] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const buscarFactura = async () => {
    try {
      const response = await axios.post("http://localhost:4000/servidor", { codigo: codigoFactura });
      setDetallesFactura(response.data);
      setMensaje("");
    } catch (error) {
      setMensaje("No se encontró una factura con ese código.");
      setDetallesFactura(null);
    }
  };

  const procesarDevolucion = async () => {
    try {
      await axios.post("http://localhost:4000/servidor", { codigo: codigoFactura });
      setMensaje("Devolución procesada con éxito.");
      setDetallesFactura(null);
      setCodigoFactura("");
    } catch (error) {
      setMensaje("Hubo un problema al procesar la devolución.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Devolución de Uniformes</h1>

      <div className="mb-3">
        <label htmlFor="codigoFactura" className="form-label">
          Código de Factura
        </label>
        <input
          type="text"
          id="codigoFactura"
          className="form-control"
          value={codigoFactura}
          onChange={(e) => setCodigoFactura(e.target.value)}
          placeholder="Ingresa el código de la factura"
        />
        <button className="btn btn-primary mt-3" onClick={buscarFactura}>
          Buscar Factura
        </button>
      </div>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {detallesFactura && (
        <div className="card mt-4">
          <div className="card-header">Detalles de la Factura</div>
          <div className="card-body">
            <p><strong>Cliente:</strong> {detallesFactura.cliente}</p>
            <p><strong>Productos:</strong></p>
            <ul>
              {detallesFactura.productos.map((producto, index) => (
                <li key={index}>
                  {producto.nombre} - {producto.talla} - {producto.cantidad}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ${detallesFactura.total}</p>
            <button className="btn btn-danger mt-3" onClick={procesarDevolucion}>
              Procesar Devolución
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevolucionUniformes;
