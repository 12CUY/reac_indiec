import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl">
          MiApp
        </Link>
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <ul
          className={`lg:flex lg:items-center lg:space-x-4 absolute lg:static bg-blue-500 w-full lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link to="/" className="text-white block p-2">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-white block p-2">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin" className="text-white block p-2">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
