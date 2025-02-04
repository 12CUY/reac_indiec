// Importa la función defineConfig desde el paquete "vite"
import { defineConfig } from "vite";
// Importa el plugin de React desde el paquete "@vitejs/plugin-react"
import react from "@vitejs/plugin-react";

// Exporta la configuración predeterminada de Vite
export default defineConfig({
  // Define los plugins a utilizar, en este caso el plugin de React
  plugins: [react()],
  // Configura la resolución de módulos
  resolve: {
    alias: {
      // Crea un alias "@" que apunta a la carpeta "/src"
      "@": "/src",
    },
  },
});
