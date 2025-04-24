import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import API_BASE_URL from "../../apiConfig";

const Dashboard = () => {
  const [totalPackages, setTotalPackages] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [latestPackages, setLatestPackages] = useState([]);

  // Obtener el número total de paquetes desde el backend
  useEffect(() => {
    const fetchTotalPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/packages/count`);
        if (!response.ok) {
          throw new Error("Error al obtener el número total de paquetes");
        }
        const data = await response.json();
        setTotalPackages(data.totalPackages);
      } catch (error) {
        console.error("Error al cargar el número total de paquetes:", error);
      }
    };

    fetchTotalPackages();
  }, []);

  // Leer el total de reservas y ganancias desde localStorage
  useEffect(() => {
    const storedReservations = parseInt(localStorage.getItem("totalReservations") || "0", 10);
    const storedEarnings = parseFloat(localStorage.getItem("totalEarnings") || "0");
    setTotalReservations(storedReservations);
    setTotalEarnings(storedEarnings);
  }, []);

  // Obtener los últimos paquetes desde el backend
  useEffect(() => {
    const fetchLatestPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/packages?limit=5`);
        if (!response.ok) {
          throw new Error("Error al obtener los últimos paquetes");
        }
        const data = await response.json();
        setLatestPackages(data);
      } catch (error) {
        console.error("Error al cargar los últimos paquetes:", error);
      }
    };

    fetchLatestPackages();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header title="Dashboard" />

        <div className="container-fluid px-4 py-4">
          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            <div className="col-xl-4 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <i className="bi bi-collection text-primary fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Paquetes Totales</h6>
                      <h3 className="mb-0">{totalPackages}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-success bg-opacity-10 p-3 rounded">
                        <i className="bi bi-calendar-check text-success fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Reservas Totales</h6>
                      <h3 className="mb-0">{totalReservations}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-info bg-opacity-10 p-3 rounded">
                        <i className="bi bi-currency-dollar text-info fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Ganancias Totales</h6>
                      <h3 className="mb-0">${totalEarnings.toFixed(2)}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Latest Packages */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Últimos Paquetes</h5>
                    <Link to="/guide/packages" className="btn btn-sm btn-outline-primary">
                      Ver todos
                    </Link>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th>
                            <i className="bi bi-box-seam me-2"></i>Nombre
                          </th>
                          <th>
                            <i className="bi bi-geo-alt-fill me-2"></i>Destino
                          </th>
                          <th>
                            <i className="bi bi-currency-dollar me-2"></i>Precio
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestPackages.length > 0 ? (
                          latestPackages.map((pkg) => (
                            <tr key={pkg.id}>
                              <td>
                                <i className="bi bi-box me-2 text-primary"></i>
                                {pkg.name}
                              </td>
                              <td>
                                <i className="bi bi-geo-alt me-2 text-success"></i>
                                {pkg.location}
                              </td>
                              <td>
                                <i className="bi bi-currency-dollar me-2 text-info"></i>
                                ${pkg.price}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center text-muted">
                              No hay paquetes disponibles.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mt-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Acciones Rápidas</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link to="/guide/packages/create" className="btn btn-primary">
                      <i className="bi bi-plus-circle me-2"></i>Crear Nuevo Paquete
                    </Link>
                    <Link to="/guide/packages" className="btn btn-outline-primary">
                      <i className="bi bi-box-seam me-2"></i>Ver Paquetes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
