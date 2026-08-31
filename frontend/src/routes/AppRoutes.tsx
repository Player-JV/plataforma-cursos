import { Routes, Route } from 'react-router-dom';
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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/modulos" element={<Modulos />} />
      <Route path="/aulas" element={<Aulas />} />
      <Route path="/trilhas" element={<Trilhas />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/matriculas" element={<Matriculas />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="/financeiro" element={<Financeiro />} />
    </Routes>
  );
}

export default AppRoutes;