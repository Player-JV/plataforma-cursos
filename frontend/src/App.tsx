import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid mt-4 px-4">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;