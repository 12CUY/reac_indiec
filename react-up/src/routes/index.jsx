import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Admin/Dashboard";
import Navbar from "../components/Navbar";
import Musica from "../pages/Admin/Musica";
import Eventos from "../pages/Admin/Eventos";

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
    </Routes>
  );
};

export default AppRoutes;
