/** @type {import('tailwindcss').Config} */ // Tipo de configuración de Tailwind CSS
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // Archivos donde Tailwind CSS buscará clases
  theme: {
    extend: {
      cursor: {
        custom: "url('/cursor.png'), pointer", // Cursor personalizado
      },
    },
  },
  plugins: [], // Plugins de Tailwind CSS
};
