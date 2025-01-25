import { useState } from 'react';
import { motion } from 'framer-motion';

const Perfil = () => {
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({
    name: 'Juan Pérez',
    email: 'juanperez@mail.com',
    phone: '0025455445',
    location: 'Ciudad,Pais', 
    profilePicture: '/img/default-profile.jpg', // Imagen de perfil por defecto
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado para controlar el modal de éxito
  const [showModal, setShowModal] = useState(false);

  // Función para manejar el cambio de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para alternar el modo de edición
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Función para guardar los cambios y mostrar el modal
  const saveChanges = () => {
    setShowModal(true); // Mostrar el modal
    setIsEditing(false); // Desactivar el modo de edición
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex-1 ml-0 md:ml-72">
      {/* Primer bloque de código */}
      <div className="p-6">
        <motion.p
          animate={{ y: [0, -10, 0] }} // Animación de salto
          transition={{ duration: 0.5 }}
        >
        </motion.p>
      </div>

      {/* Segundo bloque de código (Perfil y edición) */}
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 to-black">
        <motion.div
          className="bg-white w-full max-w-4xl p-10 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <div className="flex flex-col items-center mb-10">
            {/* Título Perfil con tamaño más grande y gradiente */}
           <img
              src={userData.profilePicture}
              className="w-32 h-32 border border-black 500 rounded-full object-cover"
            />
          </div>

          <div className="text-center mb-4">
            {isEditing ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
              />
            ) : null}
          </div>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna izquierda: Nombre y Correo */}
              <div>
                <div className="mb-4">
                  <motion.label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                    animate={{ y: [0, -10, 0] }} // Animación de salto
                    transition={{ duration: 0.5 }}
                  >
                    Nombre
                  </motion.label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-72 p-3 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    animate={{ y: [0, -10, 0] }} // Animación de salto
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="mb-4">
                  <motion.label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                    animate={{ y: [0, -10, 0] }} // Animación de salto
                    transition={{ duration: 0.5 }}
                  >
                    Correo Electrónico
                  </motion.label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-72 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    animate={{ y: [0, -10, 0] }} // Animación de salto
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Columna derecha: Número y Ubicación */}
              <div>
                {/* Campo de número */}
                <div className="mb-4">
                  <motion.label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                    animate={{ y: [0, -10, 0] }} // Animación de salto
                    transition={{ duration: 0.5 }}
                  >
                    Número
                  </motion.label>
                  <motion.input
                    type="text"
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-72 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    animate={{ y: [0, -10, 0] }} // Animación de salto
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Campo de ubicación */}
                <div className="mb-4">
                  <motion.label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                    animate={{ y: [0, -10, 0] }} // Animación de salto
                    transition={{ duration: 0.5 }}
                  >
                    Ubicación
                  </motion.label>
                  <motion.input
                    type="text"
                    id="location"
                    name="location"
                    value={userData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-72 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    animate={{ y: [0, -10, 0] }} // Animación de salto
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <motion.button
                type="button"
                onClick={isEditing ? saveChanges : toggleEdit}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200"
                whileTap={{ scale: 0.9 }} // Efecto de reducción al presionar
                animate={{ y: [0, -10, 0] }} // Animación de salto
                transition={{ duration: 0.3 }}
              >
                {isEditing ? 'Guardar cambios' : 'Editar perfil'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mb-4 flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Icono de "check" animado con borde verde claro */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-green-600 border-4 border-green-300 rounded-full p-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: [0, 360] }} // Animación de giro
                transition={{ duration: 1, loop: Infinity }} // Giro continuo
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>
            <motion.p
              className="text-lg font-semibold"
              animate={{ y: [0, -10, 0] }} // Animación de salto
              transition={{ duration: 0.5 }}
            >
              ¡Éxito!
            </motion.p>
            <motion.p
              className="mt-2"
              animate={{ y: [0, -10, 0] }} // Animación de salto
              transition={{ duration: 0.5 }}
            >
              Tus datos han sido editados con éxito.
            </motion.p>
            <motion.button
              onClick={closeModal}
              className="mt-4 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200"
              whileTap={{ scale: 0.9 }} // Efecto de reducción al presionar
              animate={{ y: [0, -10, 0] }} // Animación de salto
              transition={{ duration: 0.3 }}
            >
              Aceptar
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* Barra blanca con el texto Mis Publicaciones */}
      <div className="bg-gradient-to-r from-green-500 to-black py-2 flex items-center justify-start">
        <motion.p
          className="text-3xl font-semibold text-black text-left"
          animate={{ y: [0, -10, 0] }} // Animación de salto
          transition={{ duration: 0.5 }}
        >
          Mis Publicaciones
        </motion.p>
      </div>

      {/* Tres cuadros en la parte baja con fondo gradiente */}
      <div className="flex justify-center mt space-x-4 bg-gradient-to-r from-green-500 to-black p-10">
        {/* Cuadro 1 */}
        <motion.div
          className="w-40 h-40 bg-gray-300 rounded-lg overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.1 }} // Animación de escala al pasar el mouse
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/img/imagen1.jpg"
            alt="Imagen 1"
            className="w-full h-full object-cover"
            whileHover={{ opacity: 0 }} // Hace que la imagen cambie con opacidad
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Cuadro 2 */}
        <motion.div
          className="w-40 h-40 bg-gray-300 rounded-lg overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/img/imagen2.jpg"
            alt="Imagen 2"
            className="w-full h-full object-cover"
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Cuadro 3 */}
        <motion.div
          className="w-40 h-40 bg-gray-300 rounded-lg overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/img/imagen3.jpg"
            alt="Imagen 3"
            className="w-full h-full object-cover"
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Cuadro 4 */}
        <motion.div
          className="w-40 h-40 bg-gray-300 rounded-lg overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/img/imagen4.jpg"
            alt="Imagen 4"
            className="w-full h-full object-cover"
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Cuadro 5 */}
        <motion.div
          className="w-40 h-40 bg-gray-300 rounded-lg overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/img/imagen5.jpg"
            alt="Imagen 5"
            className="w-full h-full object-cover"
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Perfil;
