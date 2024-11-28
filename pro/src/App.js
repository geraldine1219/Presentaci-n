import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import Producto from "./components/Producto";
import Crud from "./components/Crud";
import RecoverPassword from "./components/RecoverPassword";
import DevolucionUniformes from "./components/DevolucionUniformes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/recuperarContra" element={<RecoverPassword />} />
        <Route path="/devolucion" element={<DevolucionUniformes />} />
      </Routes>
    </Router>
  );
}

export default App;
