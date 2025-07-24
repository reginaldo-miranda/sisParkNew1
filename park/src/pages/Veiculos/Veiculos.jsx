
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

import React, { useState, useEffect, useRef } from 'react';
import Impressao from "../../components/Impressao";
import "../Veiculos/Veiculos.css"; // ou "../Veiculos/Veiculos.css" dependendo do caminho

function CupomEstacionamento() {
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [tempoTotal, setTempoTotal] = useState('');
  const [valorTotal, setValorTotal] = useState(0);
  const impressaoRef = useRef();

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
      const diffHoras = diffMs / 1000 / 60 / 60;

      const horas = Math.floor(diffHoras);
      const minutos = Math.round((diffHoras - horas) * 60);
      const valor = diffHoras * 5;

      setTempoTotal(`${horas}h ${minutos}min`);
      setValorTotal(valor);
    }
  }, [horaEntrada, horaSaida]);

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

  const handlePrint = () => {
    if (impressaoRef.current) {
      impressaoRef.current.imprimir();
    }
  };

  return (
    <>
  
    <div className="container">
      <h1>Controle de Estacionamento</h1>

      {/* TODOS os campos agrupados corretamente */}
      <div className="formulario">
        <div className="placa">
          <label>Placa do Veiculo</label>
          <input type="text"/>
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

      {/* Cupom visível na tela */}
      <Impressao ref={impressaoRef} conteudo={gerarCupomTexto()} />

      <button className="botao-imprimir" onClick={handlePrint}>
        Imprimir Cupom
      </button>
    </div>
  </>
);

}

export default CupomEstacionamento;

