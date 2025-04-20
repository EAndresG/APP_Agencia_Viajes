import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Packages from './pages/Packages';
import AdminPanel from './pages/AdminPanel';
import Articulo from './pages/Articulo';
import PackageDetail from "./pages/PackageDetail";
import UserProfile from "./pages/UserProfile";
import Contact from './pages/Contact';  

// Páginas de autenticación
import Register from "./pages/Auth/Register"
import Login from './pages/Auth/Login';

// Panel del Guía
import Dashboard from "./pages/GuidePanel/Dashboard"
import GuidePanelPackages from "./pages/GuidePanel/Packages"
import PackageForm from "./pages/GuidePanel/PackageForm"
import Reservations from "./pages/GuidePanel/Reservations"
import Reviews from "./pages/GuidePanel/Reviews"
import Profiler from "./pages/GuidePanel/Profile"

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
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/Articulo" element={<Articulo />}/>
        <Route path="/PackageDetail" element={<PackageDetail />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/contact" element={<Contact />} />


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

      </Routes>
    </Router>
  );
}

export default App;