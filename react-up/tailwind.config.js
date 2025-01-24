/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      cursor: {
        custom: "url('/mano.png'), pointer", // Cursor personalizado
        
      },
    },
  },
  plugins: [],
};
