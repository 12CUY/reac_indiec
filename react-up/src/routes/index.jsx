import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Admin/Dashboard";
import Navbar from "../components/Navbar";
import Musica from "../pages/Admin/Musica";
import Eventos from "../pages/Admin/Eventos";
import GrupoMusical from "../pages/Admin/GrupoMusical";
import GeneroMusical from "../pages/Admin/GeneroMusica";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <Dashboard />
          </>
        }
      />
      <Route
        path="/music"
        element={
          <>
            <Navbar />
            <Musica/>
          </>
        }
      />
      <Route
        path="/eventos"
        element={
          <>
            <Navbar />
            <Eventos/>
          </>
        }
      />
      <Route
        path="/generomusical"
        element={
          <>
            <Navbar />
            <GeneroMusical />
          </>
        }
      />
      <Route
        path="/grupomusical"
        element={
          <>
            <Navbar />
            <GrupoMusical/>
          </>
        }
      />
      <Route
        path="/generomusical"
        element={
          <>
            <Navbar />
            <GrupoMusical />
          </>
        }
      />
      <Route
        path="/album"
        element={
          <>
            <Navbar />
            <Dashboard />
          </>
        }
      />
    </Routes>
    
    
    
      
  );
};

export default AppRoutes;
