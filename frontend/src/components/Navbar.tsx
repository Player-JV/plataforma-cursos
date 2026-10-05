import { Link, useLocation } from 'react-router-dom';

const itens = [
  { path: '/dashboard', label: '📊 Dashboard' }, // <-- Alterado de '/' para '/dashboard'
  { path: '/categorias', label: '📚 Categorias' },
  { path: '/cursos', label: '🎓 Cursos' },
  { path: '/modulos', label: '📦 Módulos' },
  { path: '/aulas', label: '🎬 Aulas' },
  { path: '/trilhas', label: '🛤️ Trilhas' },
  { path: '/usuarios', label: '👥 Usuários' },
  { path: '/matriculas', label: '📋 Matrículas' },
  { path: '/planos', label: '💳 Planos' },
  { path: '/financeiro', label: '💰 Financeiro' },
];

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* A logo também foi alterada para ir para o '/dashboard' */}
        <Link className="navbar-brand fw-bold" to="/dashboard">🎓 Academia Online</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            {itens.map(item => (
              <li className="nav-item" key={item.path}>
                <Link
                  className={`nav-link ${location.pathname === item.path ? 'active fw-bold' : ''}`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;