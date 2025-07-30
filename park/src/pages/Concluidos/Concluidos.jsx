/*export default function Concluidos(){
    return (
        <>
           <h1>Paginas Concluidas</h1>
        </>
    )
    
}*/

import React, { useEffect, useState } from "react";
import "./Style.css"; // (adicione estilos se quiser)

export default function Concluidos() {
  const [veiculos, setVeiculos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchConcluidos() {
      try {
        const res = await fetch("http://localhost:3000/veiculos/concluidos");
        const data = await res.json();
        setVeiculos(data.concluidos);
        setTotal(data.total);
      } catch (err) {
        console.error("Erro ao buscar veículos concluídos:", err);
      }
    }

    fetchConcluidos();
  }, []);

  return (
    <div className="concluidos-container">
      <h2 className="titulo">Veículos Concluídos</h2>

      <table className="tabela">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Hora Entrada</th>
            <th>Hora Saída</th>
            <th>Valor Pago</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((v) => (
            <tr key={v.id}>
              <td>{v.placa}</td>
              <td>{new Date(v.horaEntrada).toLocaleString()}</td>
              <td>{v.horaSaida ? new Date(v.horaSaida).toLocaleString() : "-"}</td>
              <td>R$ {v.valorPago?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        <strong>Total Arrecadado: R$ {total.toFixed(2)}</strong>
      </div>
    </div>
  );
}
