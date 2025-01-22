import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animación

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    navigate('/dashboard'); // Redirigir al dashboard
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 to-black">
      <motion.div 
        className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Imagen a la izquierda */}
        <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your-image.jpg)' }}>
          {/* La imagen que se desea mostrar */}
        </div>

        {/* Formulario a la derecha */}
        <div className="w-1/2 p-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
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
