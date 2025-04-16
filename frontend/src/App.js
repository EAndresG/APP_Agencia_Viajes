import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Packages from './pages/Packages';
import Myagency from './pages/Myagency';
import AdminPanel from './pages/AdminPanel';
import Articulo from './pages/Articulo';

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
      </Routes>
    </Router>
  );
}

export default App;