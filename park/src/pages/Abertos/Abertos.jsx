/* import "../Abertos/Abertos.css";

export default function Abetos() {
  const placas = [
    {
      id: "123",
      placas: "JCS2345",
      cor: "verde",
      hentrada: "15:45",
      hsaida: "18:42",
    },
    {
      id: "124",
      placas: "JCS2395",
      cor: "vermelho",
      hentrada: "16:45",
      hsaida: "18:42",
    },
  ];

  return (
    <>
      <h1 className="titulo-serv">Placas Abertas</h1>
      <input type="text" placeholder="entre com a placa" />

        <div className="mostra-tela" >
            
                {placas.map((placa) => (
                <div key={placa.id} >
                 <div className="card" >

                    <div className="info">
                    <p>Placas:{placa.placas} </p>
                    <p>Cor: {placa.cor} </p>
                    <p>Hora Entrada: {placa.hentrada} </p>
                    <p>Hora Saida: {placa.hsaida} </p>
                  </div>
                    

                    <button className="btn-fechar" >   fechar</button>
                </div>

                ))}

            

         
        </div>    
    </>
  );
}
*/

import { useState } from "react";
import "../Abertos/Abertos.css";

export default function Abertos() {
  const [filtro, setFiltro] = useState("");

  const placas = [
    {
      id: "123",
      placa: "JCS2345",
      cor: "verde",
      hentrada: "15:45",
      hsaida: "18:42",
    },
    {
      id: "124",
      placa: "JCS2395",
      cor: "vermelho",
      hentrada: "16:45",
      hsaida: "18:42",
    },
  ];

  const placasFiltradas = placas.filter((p) =>
    p.placa.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
     <div className="container">

      <h1 className="titulo-serv">Placas Abertas</h1>
      <input
        type="text"
        placeholder="entre com a placa"
        className="input-placa"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <div className="mostra-tela">
        {placasFiltradas.map((placa) => (
          <div key={placa.id} className="card">
            <div className="info">
              <p>Placa: {placa.placa}</p>
              <p>Cor: {placa.cor}</p>
              <p>Hora Entrada: {placa.hentrada}</p>
              <p>Hora Saída: {placa.hsaida}</p>
            </div>
            <button className="btn-fechar">Fechar</button>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
