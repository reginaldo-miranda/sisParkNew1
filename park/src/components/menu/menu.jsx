/*import "../../components/menu/menu.css";
export default function Menu() {
  return (
    <>
      <div className="container"></div>
      <div className="menu">
        <nav>
          <p>cadastrar</p>
          <p>servicos</p>
        </nav>
      </div>
      <div />
    </>
  );
}

//--------------------------------------------------------------
import { useState } from "react";

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleMenu}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Menu
      </button>

      {menuAberto && (
        <div className="mt-2 w-48 bg-gray-100 shadow-lg rounded p-4">
          <ul className="space-y-2">
            <li><a href="#" className="block hover:bg-gray-200 p-2 rounded">Home</a></li>
            <li><a href="#" className="block hover:bg-gray-200 p-2 rounded">Serviços</a></li>
            <li><a href="#" className="block hover:bg-gray-200 p-2 rounded">Contato</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}
*/
//------------------------------------------------------------------
import { useState, useRef, useEffect } from "react";

export default function DropdownMenu() {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Fecha o menu se clicar fora
  useEffect(() => {
    const handleClickFora = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickFora);

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Menu teste
      </button>

      {menuAberto && (
        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded">
          <ul className="p-2">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Serviços
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Contato
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
