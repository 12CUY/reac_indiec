import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animación
import Swal from 'sweetalert2'; // SweetAlert2


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Datos "quemados" para probar el login
    const validEmail = 'admin@yavirac.edu.ec';
    const validPassword = '12345';

    // Validación simple
    if (email === validEmail && password === validPassword) {
      // Redirigir al dashboard si las credenciales son correctas
      Swal.fire({
        title: 'Bienvenido',
        text: 'Has iniciado sesión correctamente',
        icon: 'success',
        confirmButtonText: 'Ir al Dashboard',
      }).then(() => {
        navigate('/dashboard'); // Redirigir al dashboard
      });
    } else {
      // Mostrar un mensaje de error si las credenciales son incorrectas
      Swal.fire({
        title: 'Error',
        text: 'Credenciales incorrectas',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 to-black">
      <motion.div
        className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Imagen a la izquierda, oculta en pantallas pequeñas */}
        <div className="hidden lg:block w-full lg:w-1/2 h-[300px] lg:h-auto bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
  style={{ backgroundImage: "url('/img/musica.jpg')" }}
>
        {/* La imagen que se desea mostrar */}
        </div>

        {/* Formulario a la derecha */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </motion.div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </motion.div>
            <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
              Iniciar Sesión
            </button>
          </form>

          {/* Enlace a la página de registro */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes una cuenta?{' '}
              <a 
                href="/register" 
                className="text-green-600 hover:text-green-700 font-semibold">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
