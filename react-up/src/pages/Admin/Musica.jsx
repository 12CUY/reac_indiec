import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // Animación

const Musica = () => {
  const [canciones, setCanciones] = useState([
    { nombre: "Canción 1", artista: "Artista 1", genero: "Rock", duracion: "3:45", album: "Álbum 1", activo: true },
    { nombre: "Canción 2", artista: "Artista 2", genero: "Pop", duracion: "4:10", album: "Álbum 2", activo: true },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    artista: "",
    genero: "",
    duracion: "",
    album: "",
  });

  // Función para abrir el modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Función para manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para agregar una nueva canción
  const handleAddCancion = () => {
    setCanciones([...canciones, { ...formData, activo: true }]);
    Swal.fire({
      icon: "success",
      title: "Canción agregada",
      text: `La canción ${formData.nombre} fue agregada exitosamente.`,
    });
    closeModal();
  };

  // Función para eliminar una canción (desactivarla)
  const handleDeleteCancion = (index) => {
    const newCanciones = [...canciones];
    newCanciones[index].activo = false; // Cambia el estado a desactivado
    setCanciones(newCanciones);
    Swal.fire({
      icon: "error",
      title: "Canción eliminada",
      text: "La canción fue desactivada.",
    });
  };

  // Función para restaurar una canción (cambiar el estado a activo)
  const handleRestoreCancion = (index) => {
    const newCanciones = [...canciones];
    newCanciones[index].activo = true; // Cambia el estado a activo
    setCanciones(newCanciones);
    Swal.fire({
      icon: "success",
      title: "Canción restaurada",
      text: "La canción fue restaurada.",
    });
  };

  return (
    <body className="cursor hover:cursor-[url('/mano.png'),_pointer]">
    <div className="flex-1 ml-0 md:ml-72 ">
      <div className="p-8">
        <p className="text-2xl font-bold mb-4 text-center">Gestión de Música</p>

        {/* Botón para abrir el modal */}
        <div className="text-center mb-4">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Agregar Canción
          </button>
        </div>

        {/* Tabla de Canciones */}
        <div className="overflow-x-auto ">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Artista</th>
                <th className="px-4 py-2">Género</th>
                <th className="px-4 py-2">Duración</th>
                <th className="px-4 py-2">Álbum</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {canciones.map((cancion, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`border-t ${cancion.activo ? "hover:bg-gray-100" : "bg-gray-300"}`}
                >
                  <td className="px-4 py-2">{cancion.nombre}</td>
                  <td className="px-4 py-2">{cancion.artista}</td>
                  <td className="px-4 py-2">{cancion.genero}</td>
                  <td className="px-4 py-2">{cancion.duracion}</td>
                  <td className="px-4 py-2">{cancion.album}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${cancion.activo ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {cancion.activo ? "Activado" : "Desactivado"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {cancion.activo ? (
                      <motion.button
                        onClick={() => handleDeleteCancion(index)}
                        className="bg-red-500 text-white p-2 rounded-lg mr-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        Eliminar
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={() => handleRestoreCancion(index)}
                        className="bg-green-500 text-white p-2 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        Restaurar
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para agregar una nueva canción */}
        {modalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
              <h2 className="text-xl font-bold mb-4">Agregar Canción</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Nombre de la canción"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Artista</label>
                <input
                  type="text"
                  name="artista"
                  value={formData.artista}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Artista"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Género</label>
                <input
                  type="text"
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Género"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Duración</label>
                <input
                  type="text"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Duración (minutos)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Álbum</label>
                <input
                  type="text"
                  name="album"
                  value={formData.album}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Álbum"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white p-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddCancion}
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div></body>
  );
};

export default Musica;
