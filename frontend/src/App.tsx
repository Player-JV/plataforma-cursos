import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function AppContent() {
  const location = useLocation();
  
  const isLogin = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      {/* Só desenha a Navbar se NÃO estivermos na página de Login */}
      {!isLogin && <Navbar />}
      
      <div className="container-fluid mt-4 px-4">
        <AppRoutes />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;