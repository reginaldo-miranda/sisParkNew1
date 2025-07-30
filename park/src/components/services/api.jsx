import axios from "axios";

const API_URL = "http://localhost:3000"; // ou sua URL da Vercel/Render/etc em produção

const api = axios.create({
  baseURL: API_URL,
});

export default api;
