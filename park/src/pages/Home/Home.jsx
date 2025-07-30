/*export default function Home(){
    return (
        <>
         <div className="container">
            Ola Home
         </div>
        </>
    )
}
    */
   // src/pages/Home.jsx
// src/pages/Home.jsx

/* esta quase boa 
import React, { useEffect, useState } from "react";
import api from "../../components/services/api"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell
} from "recharts";


export default function Home() {
  const [qtdAbertos, setQtdAbertos] = useState(0);
  const [qtdConcluidos, setQtdConcluidos] = useState(0);
  const [totalConcluidos, setTotalConcluidos] = useState(0);

  useEffect(() => {
    async function buscarDados() {
      try {
        const abertos = await api.get("/veiculos/abertos");
        const concluidosRes = await api.get("/veiculos/concluidos");

        setQtdAbertos(abertos.data.length);
        setQtdConcluidos(concluidosRes.data.concluidos.length);
        setTotalConcluidos(concluidosRes.data.total);
      } catch (error) {
        console.error("Erro ao buscar dados da dashboard:", error);
      }
    }

    buscarDados();
  }, []);

  const graficoResumo = [
    { name: "Abertos", value: qtdAbertos },
    { name: "Concluídos", value: qtdConcluidos },
  ];

  const cores = ["#8884d8", "#82ca9d"];

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>📊 Dashboard do Estacionamento</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>
        <div className="card-dashboard">
          <h3>Total Arrecadado</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>
            R$ {totalConcluidos.toFixed(2)}
          </p>
        </div>
        <div className="card-dashboard">
          <h3>Veículos Abertos</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>{qtdAbertos}</p>
        </div>
        <div className="card-dashboard">
          <h3>Veículos Concluídos</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>{qtdConcluidos}</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "40px", marginTop: "50px", flexWrap: "wrap" }}>
        <BarChart width={400} height={250} data={graficoResumo}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#36A2EB" />
        </BarChart>

        <PieChart width={250} height={250}>
          <Pie
            data={graficoResumo}
            cx={120}
            cy={120}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {graficoResumo.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}*/

import React, { useEffect, useState } from "react";
import api from "../../components/services/api";
import './Style.css';

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
  

export default function Home() {
  const [abertos, setAbertos] = useState(0);
  const [concluidos, setConcluidos] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [resumoDiario, setResumoDiario] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resAbertos = await api.get("/veiculos/abertos");
        setAbertos(resAbertos.data.length);

        const resConcluidos = await api.get("/veiculos/concluidos");
        setConcluidos(resConcluidos.data.concluidos.length);
        setValorTotal(resConcluidos.data.total);

        const resResumo = await api.get("/veiculos/resumo-diario");
        setResumoDiario(resResumo.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }
    fetchData();
  }, []);

  const pieData = [
    { name: "Abertos", value: abertos },
    { name: "Concluídos", value: concluidos },
  ];

  const COLORS = ["#FF8042", "#00C49F"];

  const barData = [
    { name: "Concluídos", total: valorTotal },
  ];

  return (
    <div className="dashboard-container">
      <h2>Dashboard Estacionamento</h2>

      <div className="resumo">
        <p>🚗 Veículos Abertos: <strong>{abertos}</strong></p>
        <p>✅ Concluídos/Fechados: <strong>{concluidos}</strong></p>
        <p>💰 Valor Total Arrecadado: <strong>R$ {valorTotal.toFixed(2)}</strong></p>
      </div>

      <div className="chart-section">
        <div className="chart-card">
          <h3>Status de Veículos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Total Arrecadado</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Arrecadação Diária (Últimos 7 Dias)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={resumoDiario}>
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// acerto