import "../Abertos/Abertos.css";

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

        <div className="mostarTela">
            <div >
                {placas.map((placa) => (
                <div key={placa.id} className="card" >
                    <p>Placas:{placa.placas} </p>
                    <p>Cor: {placa.cor} </p>
                    <p>Hora Entrada: {placa.hentrada} </p>
                    <p>Hora Saida: {placa.hsaida} </p>
                    <button>fechar</button>
                </div>
                ))}
            </div>
        </div>    
    </>
  );
}
