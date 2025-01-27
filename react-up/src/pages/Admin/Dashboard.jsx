import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importamos los estilos del calendario
import { useState } from "react";

// Registramos los elementos necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [hovered, setHovered] = useState(null); // Estado para el hover de las imágenes

  // Datos de ejemplo de canciones con imágenes y nombres aleatorios
  const songs = [
    {
      id: 1,
      name: "Noche Estrellada",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/nocheestrellas1.jpg",
    },
    {
      id: 2,
      name: "Viento del Mar",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/Viento del Mar.jpeg",
    },
    {
      id: 3,
      name: "Sueños de Otoño",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/Sueños de Otoño.jpeg",
    },
    {
      id: 4,
      name: "Ecos del Pasado",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/Ecos del Pasado.jpg",
    },
    {
      id: 5,
      name: "El Sol y la Luna",
      imageDefault: "/img/dashboard-img/principal.jpg",
      imageHover: "/img/dashboard-img/El Sol y la Luna.jpeg",
    },
  ];

  const data = {
    labels: [
      "Noche Estrellada",
      "Viento del Mar",
      "Sueños de Otoño",
      "Ecos del Pasado",
      "El Sol y la Luna",
    ],
    datasets: [
      {
        data: [12, 19, 5, 8, 3],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="flex-1 ml-10 md:ml-72 cursor-pointer">
      {/* Fondo verde a negro */}
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-black relative px-4">
        {/* Contenedor para gráfico de pastel y calendario */}
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-7xl">
          {/* Gráfico de pastel */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[350px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center">
              <Pie data={data} />
            </div>
          </motion.div>

          {/* Calendario */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[350px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center">
              <Calendar className="calendar" tileClassName="calendar-tile" />
            </div>
          </motion.div>
        </div>

        {/* Tres recuadros con notificaciones */}
        <div className="flex flex-wrap justify-center gap-4 w-full mt-8">
          {["11-01-2025", "12-02-2025", "15-03-2025"].map((date, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[350px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm font-medium text-gray-700">
                Fecha del evento: {date}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${30 + index * 10}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cards de canciones al fondo */}
        <div className="flex flex-wrap justify-center gap-4 w-full mt-8">
          {songs.map((song) => (
            <motion.div
              key={song.id}
              className="bg-white rounded-lg shadow-lg cursor-pointer w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] relative overflow-hidden"
              onMouseEnter={() => setHovered(song.id)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.05 }}
            >
              {/* Imagen ocupa todo el contenedor y mantiene el tamaño fijo */}
              <img
                src={hovered === song.id ? song.imageHover : song.imageDefault}
                alt={song.name}
                className="w-full h-40 object-cover transition-none transform-none"
              />

              {/* Texto sobre la imagen en la parte inferior */}
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-2">
                <p className="text-center text-white text-sm font-medium">
                  {song.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
