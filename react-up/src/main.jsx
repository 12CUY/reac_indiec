/**
 * Importa la biblioteca principal de React.
 */
import React from "react";

/**
 * Importa la biblioteca de ReactDOM para manipular el DOM.
 */
import ReactDOM from "react-dom/client";

/**
 * Importa el componente principal de la aplicación.
 */
import App from "./App";

/**
 * Importa los estilos globales de la aplicación.
 */
import "./index.css"; // Asegúrate de que los estilos globales estén cargados

/**
 * Renderiza el componente principal de la aplicación dentro del elemento con id "root".
 * Utiliza el modo estricto de React para ayudar a identificar problemas potenciales.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
