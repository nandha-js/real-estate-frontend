import Header from '../components/Header'
import Footer from '../components/Footer'

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4 bg-gray-50">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default UserLayout
