import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Categorias from '../pages/Categorias';
import Cursos from '../pages/Cursos';
import Modulos from '../pages/Modulos';
import Aulas from '../pages/Aulas';
import Trilhas from '../pages/Trilhas';
import Usuarios from '../pages/Usuarios';
import Matriculas from '../pages/Matriculas';
import Planos from '../pages/Planos';
import Financeiro from '../pages/Financeiro';

// Guardião de Rotas (Para qualquer utilizador logado)
const RotaProtegida = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Guardião de Rotas para Administradores
const RotaAdmin = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  const tipoUsuario = localStorage.getItem('tipoUsuario'); 
  
  if (!token || tipoUsuario !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas Livres: Alunos e Admins podem aceder */}
      <Route path="/dashboard" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
      <Route path="/trilhas" element={<RotaProtegida><Trilhas /></RotaProtegida>} />
      <Route path="/matriculas" element={<RotaProtegida><Matriculas /></RotaProtegida>} />
      <Route path="/planos" element={<RotaProtegida><Planos /></RotaProtegida>} />

      {/* Rotas Trancadas: Apenas o ADMIN (jojo@gmail) consegue aceder */}
      <Route path="/categorias" element={<RotaAdmin><Categorias /></RotaAdmin>} />
      <Route path="/cursos" element={<RotaAdmin><Cursos /></RotaAdmin>} />
      <Route path="/modulos" element={<RotaAdmin><Modulos /></RotaAdmin>} />
      <Route path="/aulas" element={<RotaAdmin><Aulas /></RotaAdmin>} />
      <Route path="/usuarios" element={<RotaAdmin><Usuarios /></RotaAdmin>} />
      <Route path="/financeiro" element={<RotaAdmin><Financeiro /></RotaAdmin>} /> 
    </Routes>
  );
}

export default AppRoutes;