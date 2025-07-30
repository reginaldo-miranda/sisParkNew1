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
/* esta  esta boa 
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
      hsaida: "",
    },
    {
      id: "124",
      placa: "HCS2395",
      cor: "vermelho",
      hentrada: "16:45",
      hsaida: "",
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
*/
/* versao com impressao */
/* versao boa 
import { useState } from "react";
import "../Abertos/Abertos.css";

export default function Abertos() {
  const [filtro, setFiltro] = useState("");
  const [cupomTexto, setCupomTexto] = useState("");
  const [modalAberta, setModalAberta] = useState(false);

  const [placas, setPlacas] = useState([
    {
      id: "123",
      placa: "JCS2345",
      cor: "verde",
      hentrada: "15:45",
      hsaida: "",
    },
    {
      id: "124",
      placa: "HCS2395",
      cor: "vermelho",
      hentrada: "16:45",
      hsaida: "",
    },
  ]);

  const [fechados, setFechados] = useState([]);

  // Gera cupom texto 80 colunas (igual antes)
  function gerarCupom(placa) {
    const largura = 80;
    const linhaSeparadora = "-".repeat(largura);

    function linhaEsquerdaDireita(esquerda, direita) {
      const espacos = largura - esquerda.length - direita.length;
      return esquerda + " ".repeat(espacos > 0 ? espacos : 1) + direita;
    }

    let cupom = "";
    cupom += linhaSeparadora + "\n";
    cupom += "ESTACIONAMENTO XYZ".padStart(40 + 14) + "\n";
    cupom += "Rua Exemplo, 123 - Cidade".padStart(40 + 12) + "\n";
    cupom += linhaSeparadora + "\n";
    cupom += linhaEsquerdaDireita("PLACA:", placa.placa) + "\n";
    cupom += linhaEsquerdaDireita("COR:", placa.cor) + "\n";
    cupom += linhaEsquerdaDireita("HORA ENTRADA:", placa.hentrada) + "\n";
    cupom += linhaEsquerdaDireita("HORA SAÍDA:", placa.hsaida) + "\n";
    cupom += linhaEsquerdaDireita("TEMPO:", placa.tempo) + "\n";
    cupom += linhaEsquerdaDireita("VALOR:", placa.valorTotal) + "\n";
    cupom += linhaSeparadora + "\n";
    cupom += "OBRIGADO E VOLTE SEMPRE!".padStart(40 + 12) + "\n";
    cupom += linhaSeparadora + "\n";

    return cupom;
  }

  // Abre modal com cupom e prepara para impressão
  function abrirModalImprimir(placa) {
    const textoCupom = gerarCupom(placa);
    setCupomTexto(textoCupom);
    setModalAberta(true);
  }

  // Função para imprimir o cupom via janela de impressão
  function imprimirCupom() {
    const printWindow = window.open("", "PRINT", "width=600,height=600");
    printWindow.document.write(`<pre style="font-family: monospace; white-space: pre-wrap;">${cupomTexto}</pre>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  const handleFechar = (id) => {
    const agora = new Date();
    const horaAtual = agora.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setPlacas((prev) => {
      const novaLista = prev.filter((p) => p.id !== id);
      const fechado = prev.find((p) => p.id === id);

      if (fechado) {
        const [hEnt, mEnt] = fechado.hentrada.split(":").map(Number);
        const entrada = new Date();
        entrada.setHours(hEnt, mEnt, 0);

        const diffMs = agora - entrada;
        const minutos = Math.floor(diffMs / 60000);
        const horasDecimais = minutos / 60;

        const valorPorHora = 5;
        const valorTotal = horasDecimais * valorPorHora;

        const novoRegistro = {
          ...fechado,
          hsaida: horaAtual,
          tempo: `${minutos} min (${horasDecimais.toFixed(2)} h)`,
          valorTotal: `R$ ${valorTotal.toFixed(2).replace(".", ",")}`,
        };

        setFechados((prevFechados) => [...prevFechados, novoRegistro]);

        // Mostrar modal com cupom pronto para imprimir
        abrirModalImprimir(novoRegistro);
      }

      return novaLista;
    });
  };

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
                <p>Hora Saída: —</p>
              </div>
              <button
                className="btn-fechar"
                onClick={() => handleFechar(placa.id)}
              >
                Fechar
              </button>
            </div>
          ))}
        </div>

        <h2 className="titulo-serv">Placas Fechadas</h2>
        <div className="mostra-tela">
          {fechados.map((placa) => (
            <div key={placa.id} className="card">
              <div className="info">
                <p>Placa: {placa.placa}</p>
                <p>Cor: {placa.cor}</p>
                <p>Hora Entrada: {placa.hentrada}</p>
                <p>Hora Saída: {placa.hsaida}</p>
                <p>Tempo Total: {placa.tempo}</p>
                <p>Valor Total: {placa.valorTotal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal /}
      {modalAberta && (
        <div
          className="modal-fundo"
          onClick={() => setModalAberta(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-conteudo"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "500px",
              maxHeight: "80vh",
              overflowY: "auto",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              position: "relative",
            }}
          >
            <pre>{cupomTexto}</pre>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => setModalAberta(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Fechar
              </button>
              <button
                onClick={imprimirCupom}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
  */

import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/veiculos";

function EstacionamentoApp() {
  const [veiculos, setVeiculos] = useState([]);

  async function fetchVeiculos() {
    try {
      const res = await fetch(`${API_URL}?status=aberto`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Dados inválidos");
      setVeiculos(data);
    } catch (error) {
      alert("Erro ao buscar veículos: " + error.message);
    }
  }

  async function handleExcluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir este veículo?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir");
      fetchVeiculos(); // Recarrega a lista
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchVeiculos();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2 className="titulo" >Veículos Estacionados (Abertos)</h2>
      {veiculos.length === 0 && <p>Nenhum veículo estacionado.</p>}
      <ul>
        {veiculos.map((v) => (
          <li key={v.id} style={{ marginBottom: 10 }}>
            <b>{v.placa}</b> - {v.marca} {v.modelo} | Entrada:{" "}
            {new Date(v.horaEntrada).toLocaleString()}
            <button
              style={{ marginLeft: 10, background: "red", color: "white" }}
              onClick={() => handleExcluir(v.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstacionamentoApp;

