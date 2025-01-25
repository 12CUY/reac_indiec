import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiEye, FiEdit, FiTrash2, FiRefreshCcw } from "react-icons/fi";
import PropTypes from "prop-types";

const GrupoMusical = () => {
  const [grupos, setGrupos] = useState([
    {
      foto: null,
      nombreGrupo: "Grupo 1",
      generoMusical: "Rock",
      descripcion: "Descripción del Grupo 1",
      plataforma: "Spotify",
      url: "https://spotify.com/grupo1",
      activo: true,
    },
    {
      foto: null,
      nombreGrupo: "Grupo 2",
      generoMusical: "Pop",
      descripcion: "Descripción del Grupo 2",
      plataforma: "YouTube",
      url: "https://youtube.com/grupo2",
      activo: true,
    },
  ]);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [formData, setFormData] = useState({
    foto: null,
    nombreGrupo: "",
    generoMusical: "",
    descripcion: "",
    plataforma: "",
    url: "",
  });
  const [currentGrupo, setCurrentGrupo] = useState(null);

  const openModalCrear = () => setModalCrear(true);
  const closeModalCrear = () => setModalCrear(false);

  const openModalEditar = (index) => {
    setCurrentGrupo(index);
    setFormData(grupos[index]);
    setModalEditar(true);
  };
  const closeModalEditar = () => setModalEditar(false);

  const openModalVer = (index) => {
    setCurrentGrupo(index);
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

  const handleAddGrupo = () => {
    setGrupos([...grupos, { ...formData, activo: true }]);
    Swal.fire({
      icon: "success",
      title: "Grupo agregado",
      text: `El grupo musical "${formData.nombreGrupo}" fue agregado exitosamente.`,
    });
    closeModalCrear();
  };

  const handleUpdateGrupo = () => {
    const updatedGrupos = [...grupos];
    updatedGrupos[currentGrupo] = { ...formData };
    setGrupos(updatedGrupos);
    Swal.fire({
      icon: "success",
      title: "Grupo actualizado",
      text: `El grupo musical "${formData.nombreGrupo}" fue actualizado exitosamente.`,
    });
    closeModalEditar();
  };

  const handleDeleteGrupo = (index) => {
    const updatedGrupos = [...grupos];
    updatedGrupos[index].activo = false;
    setGrupos(updatedGrupos);
    Swal.fire({
      icon: "error",
      title: "Grupo desactivado",
      text: "El grupo fue marcado como inactivo.",
    });
  };

  const handleRestoreGrupo = (index) => {
    const updatedGrupos = [...grupos];
    updatedGrupos[index].activo = true;
    setGrupos(updatedGrupos);
    Swal.fire({
      icon: "success",
      title: "Grupo restaurado",
      text: "El grupo fue restaurado y está activo nuevamente.",
    });
  };

  return (
    <div className="flex-1 ml-0 md:ml-72">
      <div className="p-8">
        <p className="text-2xl font-bold mb-4 text-center">Gestión de Grupos Musicales</p>

        <div className="text-center mb-4">
          <button
            onClick={openModalCrear}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Agregar Grupo Musical
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Foto</th>
                <th className="px-4 py-2">Nombre del Grupo Musical</th>
                <th className="px-4 py-2">Género Musical</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Plataforma</th>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {grupos.map((grupo, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`border-t ${
                    grupo.activo ? "hover:bg-gray-100" : "bg-gray-300"
                  }`}
                >
                  <td className="px-4 py-2">
                    {grupo.foto ? (
                      <img
                        src={URL.createObjectURL(grupo.foto)}
                        alt="Foto"
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      "Sin foto"
                    )}
                  </td>
                  <td className="px-4 py-2">{grupo.nombreGrupo}</td>
                  <td className="px-4 py-2">{grupo.generoMusical}</td>
                  <td className="px-4 py-2">{grupo.descripcion}</td>
                  <td className="px-4 py-2">{grupo.plataforma}</td>
                  <td className="px-4 py-2">
                    <a
                      href={grupo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {grupo.url}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        grupo.activo ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {grupo.activo ? "Activo" : "Inactivo"}
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
                    {grupo.activo ? (
                      <FiTrash2
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => handleDeleteGrupo(index)}
                      />
                    ) : (
                      <FiRefreshCcw
                        className="text-green-500 cursor-pointer"
                        size={20}
                        onClick={() => handleRestoreGrupo(index)}
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
            onSave={handleAddGrupo}
          />
        )}

        {modalEditar && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalEditar}
            onChange={handleInputChange}
            onSave={handleUpdateGrupo}
          />
        )}

        {modalVer && (
          <ModalVer
            data={grupos[currentGrupo]}
            onClose={closeModalVer}
          />
        )}
      </div>
    </div>
  );
};


// ModalFormulario
const ModalFormulario = ({ formData, onClose, onChange, onSave }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Formulario de Grupo Musical</h2>
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
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Plataforma</label>
          <input
            type="text"
            name="plataforma"
            value={formData.plataforma}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">URL</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

// ModalVer
const ModalVer = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Detalles del Grupo Musical</h2>
        <div className="mb-4">
          <strong>Foto:</strong>
          {data.foto ? (
            <img
              src={URL.createObjectURL(data.foto)}
              alt="Foto del Grupo"
              className="w-full h-48 object-cover rounded-md"
            />
          ) : (
            <p>Sin foto</p>
          )}
        </div>
        <div className="mb-2">
          <strong>Nombre del Grupo:</strong> {data.nombreGrupo}
        </div>
        <div className="mb-2">
          <strong>Género Musical:</strong> {data.generoMusical}
        </div>
        <div className="mb-2">
          <strong>Descripción:</strong> {data.descripcion}
        </div>
        <div className="mb-2">
          <strong>Plataforma:</strong> {data.plataforma}
        </div>
        <div className="mb-2">
          <strong>URL:</strong>{" "}
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {data.url}
          </a>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
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

export default GrupoMusical;
