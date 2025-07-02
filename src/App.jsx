import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { PropertyProvider } from './context/PropertyContext'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App