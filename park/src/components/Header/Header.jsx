/*import "../../components/Header/Header.css"
import icoMenu from "../imagens/iconeMenu.svg";

export default function Header(){
    return (
        <>
        <div className="header">
        <h1>Estacionamento</h1>
           <button>
                <img src={icoMenu} alt="" />
           </button>
           
        </div>
        
        </>
    )
}*/
//------------------------------------------------------------
import { useState } from "react";
import { Link } from "react-router-dom";
import '../../components/footer/footer'
import "../../components/Header/Header.css";
import icoMenu from "../imagens/iconeMenu.svg";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <>
      <div className="header">
        <h1>Estacionamento</h1>
        <button onClick={toggleMenu} className="btn-menu">
          <img src={icoMenu} alt="Menu" />
        </button>
      </div>

      {menuAberto && (
        <div className="menu-dropdown">
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/servicos">Serviços</Link>
            </li>
            <li>
              <Link to="/Veiculos">Veículos</Link>
            </li>
            <li>
              <Link to="Abertos">Abertos</Link>
            </li>
            <li>
              <Link to="/Concluidos">Concluídos</Link>
            </li>
            <li>
              <Link to="/sair">Sair</Link>
            </li>
          </ul>
        </div>
      )}
          
    </>
  );
}

//-------------------------------------------------
