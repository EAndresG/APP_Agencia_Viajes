import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Packages from './pages/Packages';
import Myagency from './pages/Myagency';
import AdminPanel from './pages/AdminPanel';
import Articulo from './pages/Articulo';
import PackageDetail from "./pages/PackageDetail";

// Panel del Guía
import Dashboard from "./pages/GuidePanel/Dashboard"
import GuidePanelPackages from "./pages/GuidePanel/Packages"
import PackageForm from "./pages/GuidePanel/PackageForm"
import Reservations from "./pages/GuidePanel/Reservations"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/myagency" element={<Myagency />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/Articulo" element={<Articulo />}/>
        <Route path="/PackageDetail" element={<PackageDetail />} />

        {/* Rutas del panel de guía */}
        <Route path="/guide/dashboard" element={<Dashboard />} />
        <Route path="/guide/packages" element={<GuidePanelPackages />} />
        <Route path="/guide/packages/create" element={<PackageForm />} />
        <Route path="/guide/packages/edit/:id" element={<PackageForm />} />
        <Route path="/guide/reservations" element={<Reservations />} />
      </Routes>
    </Router>
  );
}

export default App;