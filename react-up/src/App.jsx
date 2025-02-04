// Importa el enrutador principal de React Router
import { BrowserRouter as Router } from "react-router-dom";
// Importa las rutas de la aplicación definidas en un archivo separado
import AppRoutes from "./routes";

/**
 * Componente principal de la aplicación
 * Encapsula las rutas y aplica configuraciones generales.
 */
function App() {
  return (
    // Contenedor principal con una clase CSS personalizada para el cursor
    <div className="cursor-custom"> 
      {/* El componente Router permite manejar rutas en la aplicación */}
      <Router>
        {/* Renderiza las rutas configuradas */}
        <AppRoutes />
      </Router>
    </div>
  );
}

// Exporta el componente para su uso en otros archivos
export default App;
