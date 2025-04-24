import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Articulo from './pages/Articulo';
import PackageDetail from "./pages/PackageDetail";
import UserProfile from "./pages/UserProfile";
import Contact from './pages/Contact';  
import Article1 from './pages/Article/Article1'
import Article2 from './pages/Article/Article2'
import Article3 from './pages/Article/Article3'

// Páginas de autenticación
import Register from "./pages/Auth/Register"
import Login from './pages/Auth/Login';

// Panel del Guía turístico
import Dashboard from "./pages/GuidePanel/Dashboard"
import GuidePanelPackages from "./pages/GuidePanel/Packages"
import PackageForm from "./pages/GuidePanel/PackageForm"
import Reservations from "./pages/GuidePanel/Reservations"
import Reviews from "./pages/GuidePanel/Reviews"
import Profiler from "./pages/GuidePanel/Profile"

//Panel del administrador
import AdminDashboard from "./pages/AdminPanel/AdminDashboard"
import AdminPackages from "./pages/AdminPanel/AdminPackages"
import AdminReservations from "./pages/AdminPanel/AdminReservations"
import AdminReviews from "./pages/AdminPanel/AdminReviews"
import AdminProfile from "./pages/AdminPanel/AdminProfile"
import AdminPackageForm from "./pages/AdminPanel/AdminPackageForm"
import ManageUsers from './pages/AdminPanel/ManageUsers';
import AdminLogin from './pages/Auth/AdminLogin';
import AdminRegister from './pages/Auth/AdminRegister';


// Importar Bootstrap CSS y JS
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
// Importar Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css"
// Importar estilos personalizados
import "./index.css"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/Articulo" element={<Articulo />}/>
        <Route path="/PackageDetail" element={<PackageDetail />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/article1" element={<Article1 />} />
        <Route path="/article2" element={<Article2 />} />
        <Route path="/article3" element={<Article3 />} />


        {/* Rutas de autenticación */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas del panel de guía */}
        <Route path="/guide/dashboard" element={<Dashboard />} />
        <Route path="/guide/packages" element={<GuidePanelPackages />} />
        <Route path="/guide/packages/create" element={<PackageForm />} />
        <Route path="/guide/packages/edit/:id" element={<PackageForm />} />
        <Route path="/guide/reservations" element={<Reservations />} />
        <Route path="/guide/reviews" element={<Reviews />} />
        <Route path="/guide/profile" element={<Profiler />} />

        {/* Rutas del panel de administrador */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/packages" element={<AdminPackages />} />
        <Route path="/admin/packageForm/create" element={<AdminPackageForm />} />
        <Route path="/admin/packages/edit/:id" element={<AdminPackageForm />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Rutas de error */}
      </Routes>
    </Router>
  );
}

export default App;