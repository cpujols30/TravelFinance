import {Routes, Route } from 'react-router-dom';
import Inicio from '../components/Inicio/Inicio';
import Facturas from '../components/Facturas/Facturas';
import Alertas from '../components/Alertas/Alertas';
import HistorialCambios from '../components/HistorialCambios/HistorialCambios';
import ControlHorario from '../components/ControlHorario/ControlHorario';
import App from '../components/App';
import ProtectedRoute from '../routes/ProtectedRoute'
import Optimizadores from '../components/Optimizadores/Optimizadores';
import Perfil from '../components/perfil/perfil';
function UserRouter() {
    return (
        <Routes>
          <Route path="/login" element={<App />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          } />
          <Route path="/Inicio" element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          } />
          <Route path="/Facturas" element={
            <ProtectedRoute>
              <Facturas />
            </ProtectedRoute>
          } />
          <Route path="/Alertas" element={
            <ProtectedRoute>
              <Alertas />
            </ProtectedRoute>
          } />
          <Route path="/historial-cambios" element={
            <ProtectedRoute>
              <HistorialCambios />
            </ProtectedRoute>
          } />
          <Route path="/control-horario" element={
            <ProtectedRoute>
              <ControlHorario />
            </ProtectedRoute>
          } />
           <Route path="/Optimizadores" element={
            <ProtectedRoute>
              <Optimizadores/>
            </ProtectedRoute>
          } />
          <Route path="/Perfil" element={
            <ProtectedRoute>
              <Perfil/>
            </ProtectedRoute>
          } />
        </Routes>
    );
}

  export default UserRouter
  