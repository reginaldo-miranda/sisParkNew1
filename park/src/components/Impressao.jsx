/* versao boa so que completa
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
/*
// src/components/Impressao.jsx boa funcionando 
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const Impressao = forwardRef(({ conteudo }, ref) => {
  const printRef = useRef();

  useImperativeHandle(ref, () => ({
    imprimir() {
      const janela = window.open('', '', 'width=600,height=800');
      janela.document.write(`<pre style="font-family: monospace">${conteudo}</pre>`);
      janela.document.close();
      janela.print();
    },
  }));

  return (
    <pre
      ref={printRef}
      style={{ fontFamily: 'monospace', border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}
    >
      {conteudo}
    </pre>
  );
});

export default Impressao;

*/

import React, { forwardRef, useImperativeHandle } from 'react';

const Impressao = forwardRef(({ conteudo }, ref) => {
  useImperativeHandle(ref, () => ({
    imprimir() {
      const janela = window.open('', '', 'width=600,height=800');
      if (!janela) {
        alert('Não foi possível abrir a janela de impressão. Verifique o bloqueador de popups.');
        return;
      }
      janela.document.write(`
        <html>
          <head>
            <title>Impressão</title>
            <style>
              body { font-family: monospace; margin: 20px; white-space: pre-wrap; }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            <pre>${conteudo}</pre>
            <script>
              window.focus();
              window.print();
              window.close();
            <\/script>
          </body>
        </html>
      `);
      janela.document.close();
    },
  }));

  return (
    <pre
      style={{
        fontFamily: 'monospace',
        border: '1px solid #ccc',
        padding: '10px',
        marginTop: '20px',
        whiteSpace: 'pre-wrap',
      }}
    >
      {conteudo}
    </pre>
  );
});

export default Impressao;
