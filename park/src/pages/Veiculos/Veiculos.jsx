/*
export default function Veiculos() {
    return (
        <>
         <div className="container">
            <h1>pagina de estacionamento de veiculos e servicos</h1>
            <div className="row">
                <input type="text" placeholder="nome do veiculo"/>
            </div>
         </div>
        </>
    )
}

*/

/* rotina boa ja calculando o preco
import React, { useState, useEffect } from 'react';

function InputHora() {
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [tempoTotal, setTempoTotal] = useState('');
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    if (horaEntrada && horaSaida) {
      const [entradaHoras, entradaMinutos] = horaEntrada.split(':').map(Number);
      const [saidaHoras, saidaMinutos] = horaSaida.split(':').map(Number);

      const entrada = new Date();
      entrada.setHours(entradaHoras, entradaMinutos, 0);

      const saida = new Date();
      saida.setHours(saidaHoras, saidaMinutos, 0);

      if (saida < entrada) {
        setTempoTotal('Saída não pode ser antes da entrada');
        setValorTotal(0);
        return;
      }

      const diffMs = saida - entrada;
      const diffHoras = diffMs / 1000 / 60 / 60;

      const horasInteiras = Math.ceil(diffHoras); // Arredonda para cima
      const valor = horasInteiras * 5; // R$5,00 por hora

      setTempoTotal(`${horasInteiras} hora(s)`);
      setValorTotal(valor);
    } else {
      setTempoTotal('');
      setValorTotal(0);
    }
  }, [horaEntrada, horaSaida]);

  return (
    <>
      <div>
        <label htmlFor="horaEntrada">Hora de entrada:</label>
        <input
          type="time"
          id="horaEntrada"
          value={horaEntrada}
          onChange={(e) => setHoraEntrada(e.target.value)}
        />
        <p>Entrada: {horaEntrada}</p>
      </div>

      <div>
        <label htmlFor="horaSaida">Hora de saída:</label>
        <input
          type="time"
          id="horaSaida"
          value={horaSaida}
          onChange={(e) => setHoraSaida(e.target.value)}
        />
        <p>Saída: {horaSaida}</p>
      </div>

      {tempoTotal && (
        <div>
          <p>Duração: {tempoTotal}</p>
          <p>Valor a pagar: R$ {valorTotal.toFixed(2)}</p>
        </div>
      )}
    </>
  );
}

export default InputHora;
*/
/* versao boa , mas imprimi a hora cheia e nao mostra na tela
import React, { useState, useEffect, useRef } from 'react';

function CupomEstacionamento() {
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [tempoTotal, setTempoTotal] = useState('');
  const [valorTotal, setValorTotal] = useState(0);
  const cupomRef = useRef(null);

  useEffect(() => {
    if (horaEntrada && horaSaida) {
      const [hIn, mIn] = horaEntrada.split(':').map(Number);
      const [hOut, mOut] = horaSaida.split(':').map(Number);

      const entrada = new Date();
      entrada.setHours(hIn, mIn, 0);

      const saida = new Date();
      saida.setHours(hOut, mOut, 0);

      if (saida < entrada) {
        setTempoTotal('Saída antes da entrada');
        setValorTotal(0);
        return;
      }

      const diffMs = saida - entrada;
      const diffHoras = diffMs / 1000 / 60 / 60;

      const horasInteiras = Math.ceil(diffHoras);
      const valor = horasInteiras * 5;

      setTempoTotal(`${horasInteiras} hora(s)`);
      setValorTotal(valor);
    }
  }, [horaEntrada, horaSaida]);

  const handlePrint = () => {
    const conteudo = cupomRef.current.innerText;
    const janela = window.open('', '', 'width=600,height=800');
    janela.document.write(`<pre style="font-family: monospace">${conteudo}</pre>`);
    janela.document.close();
    janela.print();
  };

  const gerarCupomTexto = () => {
    const linha = (texto = '') => texto.padEnd(80, ' ') + '\n';
    const centro = (texto = '') =>
      texto.padStart((80 + texto.length) / 2, ' ').padEnd(80, ' ') + '\n';

    let texto = '';
    texto += centro('SIS PARK ESTACIONAMENTO');
    texto += centro('CUPOM DE ESTACIONAMENTO');
    texto += linha('-'.repeat(80));
    texto += linha(`Entrada: ${horaEntrada}`);
    texto += linha(`Saída  : ${horaSaida}`);
    texto += linha(`Tempo  : ${tempoTotal}`);
    texto += linha(`Valor  : R$ ${valorTotal.toFixed(2)}`);
    texto += linha('-'.repeat(80));
    texto += centro('OBRIGADO POR UTILIZAR!');
    texto += '\n\n\n'; // espaço para corte

    return texto;
  };

  return (
    <>
      <div>
        <label>Hora de entrada:</label>
        <input type="time" value={horaEntrada} onChange={(e) => setHoraEntrada(e.target.value)} />
      </div>

      <div>
        <label>Hora de saída:</label>
        <input type="time" value={horaSaida} onChange={(e) => setHoraSaida(e.target.value)} />
      </div>

      <button onClick={handlePrint}>Imprimir Cupom</button>

      <pre ref={cupomRef} style={{ display: 'none' }}>
        {gerarCupomTexto()}
      </pre>
    </>
  );
}

export default CupomEstacionamento;
*/
/* versao boa completa
import React, { useState, useEffect, useRef } from 'react';

function CupomEstacionamento() {
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [tempoTotal, setTempoTotal] = useState('');
  const [valorTotal, setValorTotal] = useState(0);
  const cupomRef = useRef(null);

  useEffect(() => {
    if (horaEntrada && horaSaida) {
      const [hIn, mIn] = horaEntrada.split(':').map(Number);
      const [hOut, mOut] = horaSaida.split(':').map(Number);

      const entrada = new Date();
      entrada.setHours(hIn, mIn, 0, 0);

      const saida = new Date();
      saida.setHours(hOut, mOut, 0, 0);

      if (saida < entrada) {
        setTempoTotal('Saída antes da entrada');
        setValorTotal(0);
        return;
      }

      const diffMs = saida - entrada;
      const diffHoras = diffMs / 1000 / 60 / 60; // decimal

      const horas = Math.floor(diffHoras);
      const minutos = Math.round((diffHoras - horas) * 60);
      const valor = diffHoras * 5;

      setTempoTotal(`${horas}h ${minutos}min`);
      setValorTotal(valor);
    }
  }, [horaEntrada, horaSaida]);

  const handlePrint = () => {
    const conteudo = gerarCupomTexto();
    const janela = window.open('', '', 'width=600,height=800');
    janela.document.write(`<pre style="font-family: monospace">${conteudo}</pre>`);
    janela.document.close();
    janela.print();
  };

  const gerarCupomTexto = () => {
    const linha = (texto = '') => texto.padEnd(80, ' ') + '\n';
    const centro = (texto = '') =>
      texto.padStart((80 + texto.length) / 2, ' ').padEnd(80, ' ') + '\n';

    let texto = '';
    texto += centro('SIS PARK ESTACIONAMENTO');
    texto += centro('CUPOM DE ESTACIONAMENTO');
    texto += linha('-'.repeat(80));
    texto += linha(`Entrada: ${horaEntrada}`);
    texto += linha(`Saída  : ${horaSaida}`);
    texto += linha(`Tempo  : ${tempoTotal}`);
    texto += linha(`Valor  : R$ ${valorTotal.toFixed(2)}`);
    texto += linha('-'.repeat(80));
    texto += centro('OBRIGADO POR UTILIZAR!');
    texto += '\n\n\n';

    return texto;
  };

  return (
    <>
      <div>
        <label>Hora de entrada:</label>
        <input type="time" value={horaEntrada} onChange={(e) => setHoraEntrada(e.target.value)} />
      </div>

      <div>
        <label>Hora de saída:</label>
        <input type="time" value={horaSaida} onChange={(e) => setHoraSaida(e.target.value)} />
      </div>

      {/* Mostrar cupom na tela /}
      <pre style={{ fontFamily: 'monospace', border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
        {gerarCupomTexto()}
      </pre>

      <button onClick={handlePrint} style={{ marginTop: '10px' }}>
        Imprimir Cupom
      </button>
    </>
  );
}

export default CupomEstacionamento;
*/
/* boa funcionando
import React, { useState, useEffect, useRef } from "react";
import Impressao from "../../components/Impressao";
import "../Veiculos/Veiculos.css"; // ou "../Veiculos/Veiculos.css" dependendo do caminho

function CupomEstacionamento() {
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSaida, setHoraSaida] = useState("");
  const [tempoTotal, setTempoTotal] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const impressaoRef = useRef();

  useEffect(() => {
    if (horaEntrada && horaSaida) {
      const [hIn, mIn] = horaEntrada.split(":").map(Number);
      const [hOut, mOut] = horaSaida.split(":").map(Number);

      const entrada = new Date();
      entrada.setHours(hIn, mIn, 0, 0);

      const saida = new Date();
      saida.setHours(hOut, mOut, 0, 0);

      if (saida < entrada) {
        setTempoTotal("Saída antes da entrada");
        setValorTotal(0);
        return;
      }

      const diffMs = saida - entrada;
      const diffHoras = diffMs / 1000 / 60 / 60;

      const horas = Math.floor(diffHoras);
      const minutos = Math.round((diffHoras - horas) * 60);
      const valor = diffHoras * 5;

      setTempoTotal(`${horas}h ${minutos}min`);
      setValorTotal(valor);
    }
  }, [horaEntrada, horaSaida]);

  const gerarCupomTexto = () => {
    const linha = (texto = "") => texto.padEnd(80, " ") + "\n";
    const centro = (texto = "") =>
      texto.padStart((80 + texto.length) / 2, " ").padEnd(80, " ") + "\n";

    let texto = "";
    texto += centro("SIS PARK ESTACIONAMENTO");
    texto += centro("CUPOM DE ESTACIONAMENTO");
    texto += linha("-".repeat(80));
    texto += linha(`Entrada: ${horaEntrada}`);
    texto += linha(`Saída  : ${horaSaida}`);
    texto += linha(`Tempo  : ${tempoTotal}`);
    texto += linha(`Valor  : R$ ${valorTotal.toFixed(2)}`);
    texto += linha("-".repeat(80));
    texto += centro("OBRIGADO POR UTILIZAR!");
    texto += "\n\n\n";

    return texto;
  };

  const handlePrint = () => {
    if (impressaoRef.current) {
      impressaoRef.current.imprimir();
    }
  };

  return (
    <>
      <div className="container">
        <h1>Controle de Estacionamento</h1>

        {/* TODOS os campos agrupados corretamente /}
        <div className="formulario">
          <div className="placa">
            <label>Placa do Veiculo</label>
            <input type="text" />
          </div>

          <div className="campo">
            <label>Hora de entrada:</label>
            <input
              type="time"
              value={horaEntrada}
              onChange={(e) => setHoraEntrada(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Hora de saída:</label>
            <input
              type="time"
              value={horaSaida}
              onChange={(e) => setHoraSaida(e.target.value)}
            />
          </div>
        </div>

        {/* Cupom visível na tela /}
        <Impressao ref={impressaoRef} conteudo={gerarCupomTexto()} />

        <button className="botao-imprimir" onClick={handlePrint}>
          Imprimir Cupom
        </button>
      </div>
    </>
  );
}

export default CupomEstacionamento;
*/


import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/veiculos";

function EstacionamentoApp() {
  const [veiculos, setVeiculos] = useState([]);
  const [form, setForm] = useState({
    placa: "",
    marca: "",
    modelo: "",
    cor: "",
    ano: "",
  });

  const [saidaHora, setSaidaHora] = useState("");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  // Busca veículos com status "aberto"
  async function fetchVeiculos() {
    try {
      const res = await fetch(`${API_URL}?status=aberto`);
      const data = await res.json();
      setVeiculos(data);
    } catch (error) {
      alert("Erro ao buscar veículos: " + error.message);
    }
  }

  useEffect(() => {
    fetchVeiculos();
  }, []);

  // Cadastrar nova entrada
  async function handleAdd(e) {
    e.preventDefault();
    if (!form.placa) {
      alert("Informe a placa");
      return;
    }

    const newEntry = {
      ...form,
      horaEntrada: new Date().toISOString(),
      status: "aberto",
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar");
      setForm({ placa: "", marca: "", modelo: "", cor: "", ano: "" });
      fetchVeiculos();
    } catch (error) {
      alert(error.message);
    }
  }

  // Seleciona veículo para fechar vaga
  function handleSelectVeiculo(veiculo) {
    setSelectedVeiculo(veiculo);
    setSaidaHora(new Date().toISOString().slice(0, 16)); // input tipo datetime-local
  }

  // Calcula valor (exemplo simples: R$5 por hora)
  function calcularValor(horaEntrada, horaSaida) {
    const entrada = new Date(horaEntrada);
    const saida = new Date(horaSaida);
    const diffMs = saida - entrada;
    const diffHoras = Math.ceil(diffMs / (1000 * 60 * 60));
    return diffHoras * 5; // R$5/hora
  }

  // Fechar vaga (atualizar registro)
  async function handleFechar(e) {
    e.preventDefault();
    if (!saidaHora) {
      alert("Informe a hora de saída");
      return;
    }

    const valorPago = calcularValor(selectedVeiculo.horaEntrada, saidaHora);

    try {
      const res = await fetch(`${API_URL}/${selectedVeiculo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          horaSaida: new Date(saidaHora).toISOString(),
          valorPago,
          status: "fechado",
        }),
      });
      if (!res.ok) throw new Error("Erro ao fechar vaga");
      setSelectedVeiculo(null);
      fetchVeiculos();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2 className="titulo" >Cadastro de Entrada</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 20 }}>
        <input
          placeholder="Placa"
          value={form.placa}
          onChange={(e) => setForm({ ...form, placa: e.target.value })}
          required
        />
        <input
          placeholder="Marca"
          value={form.marca}
          onChange={(e) => setForm({ ...form, marca: e.target.value })}
        />
        <input
          placeholder="Modelo"
          value={form.modelo}
          onChange={(e) => setForm({ ...form, modelo: e.target.value })}
        />
        <input
          placeholder="Cor"
          value={form.cor}
          onChange={(e) => setForm({ ...form, cor: e.target.value })}
        />
        <input
          placeholder="Ano"
          value={form.ano}
          onChange={(e) => setForm({ ...form, ano: e.target.value })}
        />
        <button type="submit">Adicionar Entrada</button>
      </form>

      <h2 className="titulo" >Veículos Estacionados (Abertos)</h2>
      {veiculos.length === 0 && <p>Nenhum veículo estacionado.</p>}
      <ul>
        {veiculos.map((v) => (
          <li key={v.id} style={{ marginBottom: 10 }}>
            <b>{v.placa}</b> - {v.marca} {v.modelo} | Entrada:{" "}
            {new Date(v.horaEntrada).toLocaleString()}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => handleSelectVeiculo(v)}
            >
              Fechar vaga
            </button>
          </li>
        ))}
      </ul>

      {selectedVeiculo && (
        <form onSubmit={handleFechar} style={{ marginTop: 20 }}>
          <h3>Fechar vaga - {selectedVeiculo.placa}</h3>
          <label>
            Hora Saída:
            <input
              type="datetime-local"
              value={saidaHora}
              onChange={(e) => setSaidaHora(e.target.value)}
              required
            />
          </label>
          <button type="submit" style={{ marginLeft: 10 }}>
            Confirmar Saída
          </button>
          <button
            type="button"
            onClick={() => setSelectedVeiculo(null)}
            style={{ marginLeft: 10 }}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}

export default EstacionamentoApp;

