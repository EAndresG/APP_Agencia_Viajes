"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./components/AdminSidebar";
import Header from "./components/AdminHeader";
import API_BASE_URL from "../../apiConfig";

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 5; // Límite de paquetes por página

  const [packages, setPackages] = useState([]); // Estado inicial vacío para los paquetes

  // Obtener los paquetes desde el backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/packages`); // Solicitud al backend
        if (!response.ok) {
          throw new Error("Error al obtener los paquetes");
        }
        const data = await response.json();
        setPackages(data); // Guardar los paquetes en el estado
      } catch (error) {
        console.error("Error al cargar los paquetes:", error);
        alert("No se pudieron cargar los paquetes.");
      }
    };

    fetchPackages();
  }, []);

  // Filtrar paquetes según búsqueda
  const filteredPackages = packages.filter((pkg) => {
    return pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           pkg.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calcular paquetes para la página actual
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Función para eliminar un paquete de la lista
  const handleDeletePackage = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este paquete?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
        const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Incluye el token en la cabecera
          },
        });
        if (!response.ok) {
          throw new Error("Error al eliminar el paquete");
        }
        // Eliminar el paquete del estado local
        setPackages(packages.filter((pkg) => pkg.id !== id));
        alert("Paquete eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar el paquete:", error);
        alert("No se pudo eliminar el paquete.");
      }
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header title="Mis Paquetes" />

        <div className="container-fluid px-4 py-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <div className="row align-items-center">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Buscar paquetes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-md-end">
                  <Link to="/admin/packageForm/create" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-1"></i> Nuevo Paquete
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Paquete</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPackages.map((pkg) => (
                      <tr key={pkg.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={pkg.image || "https://caracol.com.co/resizer/18egm6xhey1MYHQHjQII4yjqtpg=/arc-photo-prisaradioco/arc2-prod/public/7FZMP2BT3VAORPXCB2YTAAERRY.jpg"}
                              alt={pkg.name}
                              className="rounded me-3"
                              width="60"
                              height="40"
                              style={{ objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="mb-0">{pkg.name}</h6>
                              <small className="text-muted">{pkg.location}</small>
                              {pkg.featured && <span className="badge bg-warning text-dark ms-2">Destacado</span>}
                            </div>
                          </div>
                        </td>
                        <td>${pkg.price}</td>
                        <td>
                          <div className="btn-group">
                            <Link to={`/packages`} className="btn btn-sm btn-outline-secondary">
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link to={`/admin/packages/edit/${pkg.id}`} className="btn btn-sm btn-outline-primary">
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeletePackage(pkg.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-white py-3">
              <div className="row align-items-center">
                <div className="col-md-6 text-md-start text-center mb-2 mb-md-0">
                  <span>
                    Mostrando {currentPackages.length} de {filteredPackages.length} paquetes
                  </span>
                </div>
                <div className="col-md-6">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-md-end justify-content-center mb-0">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Anterior
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
