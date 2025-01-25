import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // Animación
import { Eye, Edit, Trash2 } from "lucide-react"; // Íconos

const GrupoMusical = () => {
  const [grupos, setGrupos] = useState([
    {
      numero: 1,
      foto: "",
      nombre: "Grupo 1",
      genero: "Rock",
      descripcion: "Grupo de rock clásico",
      plataforma: "Spotify",
      url: "https://spotify.com/grupo1",
      activo: true,
    },
  ]);

  const [modalOpen, setModalOpen] = useState({ crear: false, editar: false, ver: false });
  const [formData, setFormData] = useState({
    numero: "",
    foto: "",
    nombre: "",
    genero: "",
    descripcion: "",
    plataforma: "",
    url: "",
  });
  const [currentIndex, setCurrentIndex] = useState(null);

  // Función para manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar la carga de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para abrir los modales
  const openModal = (type, index = null) => {
    setCurrentIndex(index);
    setModalOpen({ ...modalOpen, [type]: true });
    if (type === "editar" || type === "ver") {
      setFormData(grupos[index]);
    }
  };

  // Función para cerrar los modales
  const closeModal = () => {
    setModalOpen({ crear: false, editar: false, ver: false });
    setFormData({ numero: "", foto: "", nombre: "", genero: "", descripcion: "", plataforma: "", url: "" });
  };

  // Crear un nuevo grupo musical
  const handleAddGrupo = () => {
    setGrupos([...grupos, { ...formData, activo: true }]);
    Swal.fire({
      icon: "success",
      title: "Grupo Musical agregado",
      text: `El grupo ${formData.nombre} fue agregado exitosamente.`,
    });
    closeModal();
  };

  // Editar un grupo musical
  const handleEditGrupo = () => {
    const updatedGrupos = [...grupos];
    updatedGrupos[currentIndex] = formData;
    setGrupos(updatedGrupos);
    Swal.fire({
      icon: "success",
      title: "Grupo Musical editado",
      text: `El grupo ${formData.nombre} fue actualizado exitosamente.`,
    });
    closeModal();
  };

  // Eliminar un grupo musical (lógica)
  const handleDeleteGrupo = (index) => {
    const updatedGrupos = [...grupos];
    updatedGrupos[index].activo = false;
    setGrupos(updatedGrupos);
    Swal.fire({
      icon: "error",
      title: "Grupo Musical eliminado",
      text: `El grupo fue desactivado.`,
    });
  };

  return (
    <div className="p-8">
      <p className="text-2xl font-bold mb-4 text-center">Gestión de Grupos Musicales</p>

      {/* Botón para abrir el modal de crear */}
      <div className="text-center mb-4">
        <button
          onClick={() => openModal("crear")}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Agregar Grupo Musical
        </button>
      </div>

      {/* Tabla de Grupos Musicales */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Foto</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Género</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Plataforma</th>
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
                className={`border-t ${grupo.activo ? "hover:bg-gray-100" : "bg-gray-300"}`}
              >
                <td className="px-4 py-2">{grupo.numero}</td>
                <td className="px-4 py-2">
                  {grupo.foto && <img src={grupo.foto} alt="Foto" className="w-12 h-12 object-cover rounded-full" />}
                </td>
                <td className="px-4 py-2">{grupo.nombre}</td>
                <td className="px-4 py-2">{grupo.genero}</td>
                <td className="px-4 py-2">{grupo.descripcion}</td>
                <td className="px-4 py-2">{grupo.plataforma}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${grupo.activo ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {grupo.activo ? "Activado" : "Desactivado"}
                  </span>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <Eye
                    className="text-blue-500 cursor-pointer"
                    onClick={() => openModal("ver", index)}
                  />
                  <Edit
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => openModal("editar", index)}
                  />
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteGrupo(index)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Crear/Editar */}
      {(modalOpen.crear || modalOpen.editar) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-xl font-bold mb-4">
              {modalOpen.crear ? "Agregar Grupo Musical" : "Editar Grupo Musical"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nombre del Grupo"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Foto</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {formData.foto && <img src={formData.foto} alt="Preview" className="w-full h-40 object-cover mt-2 rounded-md" />}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Género</label>
              <input
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Género Musical"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Plataforma</label>
              <input
                type="text"
                name="plataforma"
                value={formData.plataforma}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Plataforma"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">URL</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="URL"
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
                onClick={modalOpen.crear ? handleAddGrupo : handleEditGrupo}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                {modalOpen.crear ? "Agregar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ver */}
      {modalOpen.ver && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-xl font-bold mb-4">Detalles del Grupo Musical</h2>
            <div className="mb-4">
              <strong>Nombre:</strong> {formData.nombre}
            </div>
            <div className="mb-4">
              {formData.foto && <img src={formData.foto} alt="Foto" className="w-full h-40 object-cover rounded-md" />}
            </div>
            <div className="mb-4">
              <strong>Género:</strong> {formData.genero}
            </div>
            <div className="mb-4">
              <strong>Descripción:</strong> {formData.descripcion}
            </div>
            <div className="mb-4">
              <strong>Plataforma:</strong> {formData.plataforma}
            </div>
            <div className="mb-4">
              <strong>URL:</strong> <a href={formData.url} target="_blank" rel="noopener noreferrer">{formData.url}</a>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white p-2 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrupoMusical;
