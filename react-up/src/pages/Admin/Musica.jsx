import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiEye, FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi"; // Añadido el ícono de restaurar
import PropTypes from "prop-types";

// Componente principal
const Musica = () => {
  const [canciones, setCanciones] = useState([
    {
      nombre: "Canción 1",
      artista: "Artista 1",
      genero: "Rock",
      duracion: "3:45",
      album: "Álbum 1",
      imagen: null,
      activo: true,
    },
    {
      nombre: "Canción 2",
      artista: "Artista 2",
      genero: "Pop",
      duracion: "4:10",
      album: "Álbum 2",
      imagen: null,
      activo: true,
    },
  ]);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    artista: "",
    genero: "",
    duracion: "",
    album: "",
    imagen: null,
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
    if (name === "imagen") {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddCancion = () => {
    setCanciones([...canciones, { ...formData, activo: true }]);
    Swal.fire({
      icon: "success",
      title: "Canción agregada",
      text: `La canción "${formData.nombre}" fue agregada exitosamente.`,
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
      text: `La canción "${formData.nombre}" fue actualizada exitosamente.`,
    });
    closeModalEditar();
  };

  const handleDeleteCancion = (index) => {
    const updatedCanciones = [...canciones];
    updatedCanciones[index].activo = false;
    setCanciones(updatedCanciones);
    Swal.fire({
      icon: "error",
      title: "Canción desactivada",
      text: "La canción fue marcada como inactiva.",
    });
  };

  const handleRestoreCancion = (index) => {
    const updatedCanciones = [...canciones];
    updatedCanciones[index].activo = true;
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
                <th className="px-4 py-2">Imagen</th>
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
                  className={`border-t ${
                    cancion.activo ? "hover:bg-gray-100" : "bg-gray-300"
                  }`}
                >
                  <td className="px-4 py-2">
                    {cancion.imagen ? (
                      <img
                        src={URL.createObjectURL(cancion.imagen)}
                        alt="Imagen"
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </td>
                  <td className="px-4 py-2">{cancion.nombre}</td>
                  <td className="px-4 py-2">{cancion.artista}</td>
                  <td className="px-4 py-2">{cancion.genero}</td>
                  <td className="px-4 py-2">{cancion.duracion}</td>
                  <td className="px-4 py-2">{cancion.album}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        cancion.activo ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {cancion.activo ? "Activo" : "Inactivo"}
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
                    <FiTrash2
                      className="text-red-500 cursor-pointer"
                      size={20}
                      onClick={() => handleDeleteCancion(index)}
                    />
                    {!cancion.activo && (
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
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Artista</label>
          <input
            type="text"
            name="artista"
            value={formData.artista}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Género</label>
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={onChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Duración</label>
          <input
            type="text"
            name="duracion"
            value={formData.duracion}
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Imagen</label>
          <input
            type="file"
            name="imagen"
            onChange={onChange}
            className="w-full"
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
      <p><strong>Nombre:</strong> {cancion.nombre}</p>
      <p><strong>Artista:</strong> {cancion.artista}</p>
      <p><strong>Género:</strong> {cancion.genero}</p>
      <p><strong>Duración:</strong> {cancion.duracion}</p>
      <p><strong>Álbum:</strong> {cancion.album}</p>
      <div className="mb-4">
        <strong>Imagen:</strong>
        {cancion.imagen ? (
          <img
            src={URL.createObjectURL(cancion.imagen)}
            alt="Imagen"
            className="w-12 h-12 object-cover rounded-md"
          />
        ) : (
          <p>Sin imagen</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Cerrar
      </button>
    </div>
  </div>
);

// PropTypes para validación de propiedades
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