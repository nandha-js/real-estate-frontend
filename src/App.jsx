import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <AppRoutes />
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
