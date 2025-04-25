"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { useState, useEffect } from "react"; // Manejo de estado y efectos secundarios
import { Link, useParams, useNavigate } from "react-router-dom"; // Navegación entre rutas
import Sidebar from "./components/AdminSidebar"; // Componente del menú lateral
import Header from "./components/AdminHeader"; // Componente del encabezado
import API_BASE_URL from "../../apiConfig"; // URL base de la API

// Componente principal para crear o editar paquetes
const PackageForm = () => {
  const { id } = useParams(); // Obtener el ID del paquete desde la URL
  const navigate = useNavigate(); // Hook para redirigir al usuario
  const isEditing = !!id; // Determinar si estamos editando un paquete existente

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: "",
    location: "Colombia",
    price: "",
    capacity: "",
    duration: "",
    description: "",
    longDescription: "",
    itinerary: "",
  });

  // Estado para las imágenes
  const [images, setImages] = useState([]);

  // Estado para la carga
  const [isLoading, setIsLoading] = useState(false);

  // Cargar datos del paquete si estamos editando
  useEffect(() => {
    if (isEditing) {
      const fetchPackage = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/packages/${id}`);
          if (!response.ok) {
            throw new Error("Error al cargar el paquete");
          }
          const data = await response.json();
          setFormData({
            name: data.name,
            location: data.location,
            price: data.price,
            capacity: data.capacity,
            duration: data.duration,
            description: data.description,
            longDescription: data.longDescription,
            itinerary: data.itinerary,
          });
          // Si hay imágenes, cargarlas
          if (data.images) {
            setImages(data.images.map((url, index) => ({ id: index, url, main: index === 0 })));
          }
        } catch (error) {
          console.error("Error al cargar el paquete:", error);
        }
      };
      fetchPackage();
    }
  }, [id, isEditing]);

  // Manejadores de eventos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      main: images.length === 0 && index === 0, // Primera imagen como principal si no hay otras
      file,
    }));

    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    const newImages = images.filter((img) => img.id !== id);

    // Si eliminamos la imagen principal, establecer la primera como principal
    if (images.find((img) => img.id === id)?.main && newImages.length > 0) {
      newImages[0].main = true;
    }

    setImages(newImages);
  };

  const handleSetMainImage = (id) => {
    const newImages = images.map((img) => ({
      ...img,
      main: img.id === id,
    }));

    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Obtener el guide_id del token JWT
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificar el token
    const guideId = decodedToken.id; // Obtener el ID del guía

    // Datos a enviar al backend
    const packageData = {
      guide_id: guideId,
      name: formData.name,
      location: formData.location,
      price: formData.price,
      capacity: formData.capacity,
      duration: formData.duration,
      description: formData.description,
      long_description: formData.longDescription,
      itinerary: formData.itinerary,
    };

    try {
      let response;
      if (isEditing) {
        // Actualizar paquete existente
        response = await fetch(`${API_BASE_URL}/packages/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(packageData),
        });
      } else {
        // Crear nuevo paquete
        response = await fetch(`${API_BASE_URL}/packages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(packageData),
        });
      }

      if (!response.ok) {
        throw new Error("Error al guardar el paquete");
      }

      alert(isEditing ? "Paquete actualizado correctamente." : "Paquete creado correctamente.");
      navigate("/guide/packages");
    } catch (error) {
      console.error("Error al guardar el paquete:", error);
      alert("Ocurrió un error al guardar el paquete.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar /> {/* Menú lateral */}

      <div className="flex-grow-1">
        <Header title={isEditing ? "Editar Paquete" : "Crear Nuevo Paquete"} /> {/* Encabezado */}

        <div className="container-fluid px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-lg-8">
                {/* Información Básica */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Información Básica</h5>
                  </div>
                  <div className="card-body">
                    {/* Campos del formulario */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Nombre del Paquete *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="location" className="form-label">
                          Ubicación *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="price" className="form-label">
                          Precio (USD) *
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="capacity" className="form-label">
                          Capacidad
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="capacity"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleChange}
                          placeholder="Ej: 2-4 personas"
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="duration" className="form-label">
                          Duración (días) *
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="duration"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Descripción Corta *
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <div className="form-text">Breve descripción que aparecerá en las tarjetas de paquetes.</div>
                    </div>
                  </div>
                </div>

                {/* Descripción Detallada */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Descripción Detallada</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="longDescription" className="form-label">
                        Descripción Completa *
                      </label>
                      <textarea
                        className="form-control"
                        id="longDescription"
                        name="longDescription"
                        rows="6"
                        value={formData.longDescription}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <div className="form-text">
                        Descripción detallada del paquete. Puedes usar formato HTML básico.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="itinerary" className="form-label">
                        Itinerario *
                      </label>
                      <textarea
                        className="form-control"
                        id="itinerary"
                        name="itinerary"
                        rows="6"
                        value={formData.itinerary}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <div className="form-text">
                        Detalla el itinerario día por día. Puedes usar formato HTML básico.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Imágenes */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Imágenes</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="images" className="form-label">
                        Subir Imágenes *
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <div className="form-text">
                        Puedes subir múltiples imágenes. La primera será la imagen principal.
                      </div>
                    </div>

                    <div className="row g-3 mt-2">
                      {images.map((image) => (
                        <div key={image.id} className="col-md-4 col-6">
                          <div className={`card ${image.main ? "border-primary" : ""}`}>
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt="Preview"
                              className="card-img-top"
                              style={{ height: "150px", objectFit: "cover" }}
                            />
                            <div className="card-body p-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    id={`main-${image.id}`}
                                    name="mainImage"
                                    checked={image.main}
                                    onChange={() => handleSetMainImage(image.id)}
                                  />
                                  <label className="form-check-label" htmlFor={`main-${image.id}`}>
                                    Principal
                                  </label>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleRemoveImage(image.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                {/* Publicación */}
                <div className="card border-0 shadow-sm mb-4 sticky-top" style={{ top: "20px", zIndex: 10 }}>
                  <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Publicación</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? "Guardando..." : isEditing ? "Actualizar Paquete" : "Crear Paquete"}
                      </button>
                      <Link to="/guide/packages" className="btn btn-outline-secondary">
                        Cancelar
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Vista Previa */}
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Vista Previa</h5>
                  </div>
                  <div className="card-body">
                    <div className="card border shadow-sm">
                      <div className="position-relative">
                        <img
                          src={
                            images.find((img) => img.main)?.url || "https://v0.dev/placeholder.svg?height=200&width=300"
                          }
                          alt="Preview"
                          className="card-img-top"
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="card-title mb-0">{formData.name || "Nombre del Paquete"}</h6>
                          <span className="badge bg-primary rounded-pill">${formData.price || "0"}</span>
                        </div>
                        <p className="text-muted small mb-2">
                          <i className="bi bi-geo-alt me-1"></i>
                          {formData.location || "Ubicación"}
                        </p>
                        <p className="card-text small">
                          {formData.description
                            ? formData.description.length > 100
                              ? formData.description.substring(0, 100) + "..."
                              : formData.description
                            : "Descripción del paquete..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageForm; // Exportar el componente para usarlo en otras partes de la aplicación
