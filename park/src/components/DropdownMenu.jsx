import { useState } from "react";

export default function DropdownMenu() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Menu teste
      </button>

      {menuAberto && (
        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded">
          <ul className="p-2">
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Home</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Serviços</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Contato</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}
