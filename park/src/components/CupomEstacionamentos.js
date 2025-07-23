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
