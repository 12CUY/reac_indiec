import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiEye, FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import PropTypes from "prop-types";

const Album = () => {
  const [albums, setAlbums] = useState([
    {
      foto: null,
      nombreAlbum: "Álbum 1",
      nombreGrupo: "Grupo 1",
      generoMusical: "Rock",
      integrantes: 5,
      url: "https://spotify.com/album1",
      activo: true,
    },
    {
      foto: null,
      nombreAlbum: "Álbum 2",
      nombreGrupo: "Grupo 2",
      generoMusical: "Pop",
      integrantes: 4,
      url: "https://youtube.com/album2",
      activo: true,
    },
  ]);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [formData, setFormData] = useState({
    foto: null,
    nombreAlbum: "",
    nombreGrupo: "",
    generoMusical: "",
    integrantes: 0,
    url: "",
  });
  const [currentAlbum, setCurrentAlbum] = useState(null);

  const openModalCrear = () => setModalCrear(true);
  const closeModalCrear = () => setModalCrear(false);

  const openModalEditar = (index) => {
    setCurrentAlbum(index);
    setFormData(albums[index]);
    setModalEditar(true);
  };
  const closeModalEditar = () => setModalEditar(false);

  const openModalVer = (index) => {
    setCurrentAlbum(index);
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

  const handleAddAlbum = () => {
    setAlbums([...albums, { ...formData, activo: true }]);
    Swal.fire({
      icon: "success",
      title: "Álbum agregado",
      text: `El álbum "${formData.nombreAlbum}" fue agregado exitosamente.`,
    });
    closeModalCrear();
  };

  const handleUpdateAlbum = () => {
    const updatedAlbums = [...albums];
    updatedAlbums[currentAlbum] = { ...formData };
    setAlbums(updatedAlbums);
    Swal.fire({
      icon: "success",
      title: "Álbum actualizado",
      text: `El álbum "${formData.nombreAlbum}" fue actualizado exitosamente.`,
    });
    closeModalEditar();
  };

  const handleDeleteAlbum = (index) => {
    const updatedAlbums = [...albums];
    updatedAlbums[index].activo = false;
    setAlbums(updatedAlbums);
    Swal.fire({
      icon: "error",
      title: "Álbum desactivado",
      text: "El álbum fue marcado como inactivo.",
    });
  };

  const handleRestoreAlbum = (index) => {
    const updatedAlbums = [...albums];
    updatedAlbums[index].activo = true;
    setAlbums(updatedAlbums);
    Swal.fire({
      icon: "success",
      title: "Álbum restaurado",
      text: "El álbum fue restaurado y está activo nuevamente.",
    });
  };

  return (
    <div className="flex-1 ml-0 md:ml-72">
      <div className="p-8">
        <p className="text-2xl font-bold mb-4 text-center">Gestión de Álbumes</p>

        <div className="text-center mb-4">
          <button
            onClick={openModalCrear}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Agregar Álbum
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Foto</th>
                <th className="px-4 py-2">Nombre del Álbum</th>
                <th className="px-4 py-2">Nombre del Grupo</th>
                <th className="px-4 py-2">Género Musical</th>
                <th className="px-4 py-2">Integrantes</th>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`border-t ${
                    album.activo ? "hover:bg-gray-100" : "bg-gray-300"
                  }`}
                >
                  <td className="px-4 py-2">
                    {album.foto ? (
                      <img
                        src={URL.createObjectURL(album.foto)}
                        alt="Foto"
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      "Sin foto"
                    )}
                  </td>
                  <td className="px-4 py-2">{album.nombreAlbum}</td>
                  <td className="px-4 py-2">{album.nombreGrupo}</td>
                  <td className="px-4 py-2">{album.generoMusical}</td>
                  <td className="px-4 py-2">{album.integrantes}</td>
                  <td className="px-4 py-2">
                    <a
                      href={album.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {album.url}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        album.activo ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {album.activo ? "Activo" : "Inactivo"}
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
                    {album.activo ? (
                      <FiTrash2
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDeleteAlbum(index)}
                      />
                    ) : (
                      <FiRefreshCcw
                        className="text-green-500 cursor-pointer"
                        size={20}
                        onClick={() => handleRestoreAlbum(index)}
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
            onSave={handleAddAlbum}
          />
        )}

        {modalEditar && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalEditar}
            onChange={handleInputChange}
            onSave={handleUpdateAlbum}
          />
        )}

        {modalVer && (
          <ModalVer
            data={albums[currentAlbum]}
            onClose={closeModalVer}
          />
        )}
      </div>
    </div>
  );
};

const ModalFormulario = ({ formData, onClose, onChange, onSave }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Formulario de Álbum</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Foto</label>
          <input
            type="file"
            name="foto"
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre del Álbum</label>
          <input
            type="text"
            name="nombreAlbum"
            value={formData.nombreAlbum}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre del Grupo</label>
          <input
            type="text"
            name="nombreGrupo"
            value={formData.nombreGrupo}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Género Musical</label>
          <input
            type="text"
            name="generoMusical"
            value={formData.generoMusical}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Integrantes</label>
          <input
            type="number"
            name="integrantes"
            value={formData.integrantes}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="text-center">
          <button
            onClick={onSave}
            className="bg-blue-500 text-white p-2 rounded-lg mr-2"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalVer = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Ver Álbum</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Foto</label>
          {data.foto ? (
            <img
              src={URL.createObjectURL(data.foto)}
              alt="Foto"
              className="w-12 h-12 object-cover rounded-md"
            />
          ) : (
            <span>Sin foto</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre del Álbum</label>
          <p>{data.nombreAlbum}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre del Grupo</label>
          <p>{data.nombreGrupo}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Género Musical</label>
          <p>{data.generoMusical}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Integrantes</label>
          <p>{data.integrantes}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">URL</label>
          <p>{data.url}</p>
        </div>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
ModalFormulario.propTypes = {
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

ModalVer.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Album;
