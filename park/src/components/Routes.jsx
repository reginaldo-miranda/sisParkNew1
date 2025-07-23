// src/routes.jsx
/*
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Servicos from './pages/Servicos/Servicos';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicos" element={<Servicos />} />
      {/* Adicione outras rotas aqui/}
    </Routes>
  );
}
*/
//---------------------------------------------

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";        // corrigido
import Servicos from "../pages/Servicos/Servicos";
import Veiculos from "../pages/Veiculos/Veiculos"; // adicionado


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/veiculos" element={<Veiculos />} />
    </Routes>
  );
}

