import "../Servicos/servicos.css"

export default function Servicos(){
  return (
    <>
      <h2 className="titulo-serv">Servicos</h2>
      <div className="ser-container">
        <div>
          <div>
            <label>Descricao do serviço</label>
          </div>
           <input type="text" id="" className="descricao" />
           
           <input type="text" id="" className="valor" />
        </div>
               
      </div>
      <div >
        <button className="botao">cadastrar</button>
      </div>
    </>
  );
}
