import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiEye, FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi"; // Añadido el ícono de restaurar
import PropTypes from "prop-types";


// Componente principal
const Musica = () => {
  const [canciones, setCanciones] = useState([
    {
      foto: null,
      nombreCancion: "Canción 1",
      nombreArtista: "Artista 1",
      generoMusical: "Rock",
      album: "Álbum 1",
      estado: "Activo",
    },
    {
      foto: null,
      nombreCancion: "Canción 2",
      nombreArtista: "Artista 2",
      generoMusical: "Pop",
      album: "Álbum 2",
      estado: "Activo",
    },
  ]);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [formData, setFormData] = useState({
    
    foto: null,
    nombreCancion: "",
    nombreArtista: "",
    generoMusical: "",
    album: "",
    estado: "Activo",
  });
  const [currentCancion, setCurrentCancion] = useState(null);

  const openModalCrear = () => setModalCrear(true);
  const closeModalCrear = () => setModalCrear(false);

  const openModalEditar = (index) => {
    setCurrentCancion(index);
    setFormData(canciones[index]);
    setModalEditar(true);
  };
  const closeModalEditar = () => setModalEditar(false);

  const openModalVer = (index) => {
    setCurrentCancion(index);
    setModalVer(true);
  };
  const closeModalVer = () => setModalVer(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddCancion = () => {
    setCanciones([...canciones, { ...formData }]);
    Swal.fire({
      icon: "success",
      title: "Canción agregada",
      text: `La canción "${formData.nombreCancion}" fue agregada exitosamente.`,
    });
    closeModalCrear();
  };

  const handleUpdateCancion = () => {
    const updatedCanciones = [...canciones];
    updatedCanciones[currentCancion] = { ...formData };
    setCanciones(updatedCanciones);
    Swal.fire({
      icon: "success",
      title: "Canción actualizada",
      text: `La canción "${formData.nombreCancion}" fue actualizada exitosamente.`,
    });
    closeModalEditar();
  };

  const handleDeleteCancion = (index) => {
    const updatedCanciones = [...canciones];
    updatedCanciones[index].estado = "Inactivo";
    setCanciones(updatedCanciones);
    Swal.fire({
      icon: "error",
      title: "Canción desactivada",
      text: "La canción fue marcada como inactiva.",
    });
  };
  const handleRestoreCancion = (index) => {
    const updatedCanciones = [...canciones];
    updatedCanciones[index].estado = "Activo";
    setCanciones(updatedCanciones);
    Swal.fire({
      icon: "success",
      title: "Canción restaurada",
      text: "La canción fue restaurada y está activa nuevamente.",
    });
  };

  return (
    <div className="flex-1 ml-0 md:ml-72">
      <div className="p-8">
        <p className="text-2xl font-bold mb-4 text-center">Gestión de Música</p>

        <div className="text-center mb-4">
          <button
            onClick={openModalCrear}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Agregar Canción
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Foto</th>
                <th className="px-4 py-2">Nombre de la Canción</th>
                <th className="px-4 py-2">Nombre del Artista</th>
                <th className="px-4 py-2">Género Musical</th>
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
                  className={`border-t ${cancion.estado === "Activo" ? "hover:bg-gray-100" : "bg-gray-300"}`}
                >
                  <td className="px-4 py-2">
                    {cancion.foto ? (
                      <img
                        src={URL.createObjectURL(cancion.foto)}
                        alt="Foto"
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      "Sin foto"
                    )}
                  </td>
                  <td className="px-4 py-2">{cancion.nombreCancion}</td>
                  <td className="px-4 py-2">{cancion.nombreArtista}</td>
                  <td className="px-4 py-2">{cancion.generoMusical}</td>
                  <td className="px-4 py-2">{cancion.album}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        cancion.estado === "Activo" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {cancion.estado}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <FiEye
                      className="text-blue-500 cursor-pointer"
                      size={20}
                      onClick={() => openModalVer(index)}
                    />
                    <FiEdit
                      className="text-yellow-500 cursor-pointer"
                      size={20}
                      onClick={() => openModalEditar(index)}
                    />
                    {cancion.estado === "Activo" ? (
                      <FiTrash2
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDeleteCancion(index)}
                      />
                    ) : (
                      <FiRefreshCcw
                        className="text-green-500 cursor-pointer"
                        size={20}
                        onClick={() => handleRestoreCancion(index)}
                      />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modales */}
        {modalCrear && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalCrear}
            onChange={handleInputChange}
            onSave={handleAddCancion}
          />
        )}

        {modalEditar && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalEditar}
            onChange={handleInputChange}
            onSave={handleUpdateCancion}
          />
        )}

        {modalVer && (
          <ModalVer
            cancion={canciones[currentCancion]}
            onClose={closeModalVer}
          />
        )}
      </div>
    </div>
  );
};

// ModalFormulario
const ModalFormulario = ({ formData, onClose, onChange, onSave }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Formulario de Canción</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Foto</label>
          <input
            type="file"
            name="foto"
            onChange={onChange}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre de la Canción</label>
          <input
            type="text"
            name="nombreCancion"
            value={formData.nombreCancion}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre del Artista</label>
          <input
            type="text"
            name="nombreArtista"
            value={formData.nombreArtista}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Género Musical</label>
          <input
            type="text"
            name="generoMusical"
            value={formData.generoMusical}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Álbum</label>
          <input
            type="text"
            name="album"
            value={formData.album}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
);

// ModalVer
const ModalVer = ({ cancion, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Ver Canción</h2>
      <div className="mb-4">
        <strong>Foto:</strong>
        {cancion.foto ? (
          <img
            src={URL.createObjectURL(cancion.foto)}
            alt="Foto"
            className="w-12 h-12 object-cover rounded-md"
          />
        ) : (
          "Sin foto"
        )}
      </div>
      <div className="mb-4">
        <strong>Nombre de la Canción:</strong>
        <p>{cancion.nombreCancion}</p>
      </div>
      <div className="mb-4">
        <strong>Nombre del Artista:</strong>
        <p>{cancion.nombreArtista}</p>
      </div>
      <div className="mb-4">
        <strong>Género Musical:</strong>
        <p>{cancion.generoMusical}</p>
      </div>
      <div className="mb-4">
        <strong>Álbum:</strong>
        <p>{cancion.album}</p>
      </div>
      <div className="mb-4">
        <strong>Estado:</strong>
        <p>{cancion.estado}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
);

// PropTypes
ModalFormulario.propTypes = {
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

ModalVer.propTypes = {
  cancion: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Musica;
