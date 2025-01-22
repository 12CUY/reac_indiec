import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/outline'; // Asegúrate de instalar heroicons
import { motion } from 'framer-motion'; // Asegúrate de instalar framer-motion

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí va la lógica de registro
    navigate('/dashboard');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Formulario a la izquierda */}
        <div className="w-1/2 p-6 flex flex-col justify-center items-center">
          <motion.h2
            className="text-3xl font-semibold text-center text-green-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Crear Cuenta
          </motion.h2>

          <form onSubmit={handleRegister} className="w-full max-w-md">
            <div className="mb-4">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 ease-in-out">
              Crear Cuenta
            </button>
          </form>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta? 
              <button 
                onClick={handleGoToLogin} 
                className="text-green-600 font-semibold hover:underline flex items-center gap-2 mt-2">
                Iniciar sesión 
                <ArrowRightIcon className="h-5 w-5 text-green-600" />
              </button>
            </p>
          </div>
        </div>

        {/* Imagen a la derecha */}
        <div className="w-1/2 bg-green-100">
          <motion.img 
            src="https://via.placeholder.com/500" // Utiliza una imagen de prueba
            alt="Imagen de registro"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
