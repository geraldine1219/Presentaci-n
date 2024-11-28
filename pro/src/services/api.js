import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/devoluciones", // Cambia según tu entorno
});

export default api;
