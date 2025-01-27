import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaMusic, FaUsers } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    alert("Sesión cerrada");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-black text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:w-72`}
      >
        <div className="p-4">
          {/* Logo */}
          <div className="text-3xl font-bold text-green-500 mb-8">INDIEC</div>

          {/* Menu items */}
          <ul className="space-y-6">
  <li className="hover:bg-green-500 p-3 rounded-md transition-colors">
    <a
      href="/dashboard"
      className="flex items-center gap-3 hover:cursor-[url('/cursor.png'),_pointer]"
    >
      <FaHome size={20} /> Dashboard
    </a>
  </li>
  <li className="hover:bg-green-500 p-3 rounded-md transition-colors">
    <a
      href="/musica"
      className="flex items-center gap-3 hover:cursor-[url('/musicaa.png'),_pointer]"
    >
      <FaMusic size={20} /> Música
    </a>
  </li>
  <li className="hover:bg-green-500 p-3 rounded-md transition-colors">
    <a
      href="/grupomusical"
      className="flex items-center gap-3 hover:cursor-[url('/cursor.png'),_pointer]"
    >
      <FaUsers size={20} /> Grupo Musical
    </a>
  </li>

  <li className="hover:bg-green-500 p-3 rounded-md transition-colors">
    <a
      href="/album"
      className="flex items-center gap-3 hover:cursor-[url('/cursor.png'),_pointer]"
    >
      <FaHome size={20} /> Album
    </a>
  </li>
  <li className="hover:bg-green-500 p-3 rounded-md transition-colors">
    <a
      href="/manager"
      className="flex items-center gap-3 hover:cursor-[url('/cursor.png'),_pointer]"
    >
      <FaHome size={20} /> Manager
    </a>
  </li>
  <li className="hover:bg-green-500 p-3 rounded-md transition-colors">
    <a
      href="/eventos"
      className="flex items-center gap-3 hover:cursor-[url('/cursor.png'),_pointer]"
    >
      <FaHome size={20} /> Eventos
    </a>
  </li>
</ul>

        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-72 bg-gray-100">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white shadow-md p-4">
          <div></div> {/* Empty for alignment */}
          {/* Content for Mobile and Desktop */}
          <div className="flex items-center space-x-4 md:flex-row flex-col">
            {/* User Info with Dropdown */}
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                {/* Display user info only on mobile */}
                <img
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                  src="https://via.placeholder.com/100"
                  alt="Usuario"
                />
                {/* Display user info on desktop */}
              </div>

              {/* Dropdown Menu (only mobile) */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-4 text-sm">
                  <ul className="space-y-2">
                    <h5>gerardo moran</h5>
                    <li>
                      <a
                        href="/perfil"
                        className="text-gray-800 hover:text-green-500"
                      >
                        Perfil
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-gray-800 hover:text-green-500 w-full text-left"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Notification Button for mobile */}
            <div className="relative md:mb-0 mb-2">
              <button
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none"
                onClick={() => setShowNotification(!showNotification)}
              >
                🔔
              </button>
              {showNotification && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4 text-sm">
                  <p className="font-bold mb-2">Notificaciones</p>
                  <div className="bg-gray-100 p-3 rounded-md">
                    Tienes nuevos eventos listos para ti 🎉
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Header - Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none md:hidden"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
