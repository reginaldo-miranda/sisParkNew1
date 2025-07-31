/*import axios from "axios";

const API_URL = "http://localhost:3000"; // ou sua URL da Vercel/Render/etc em produção

const api = axios.create({
  baseURL: API_URL,
});

export default api;
*/
/*
import axios from "axios";
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://sispark-api.vercel.app";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
*/
// src/services/api.js ou onde estiver
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default api;



