"use client"

import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

const PackageForm = () => {
  const { id } = useParams()
  const isEditing = !!id

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: isEditing ? "Cartagena - Ciudad Amurallada" : "",
    location: isEditing ? "Colombia" : "",
    price: isEditing ? "1095" : "",
    capacity: isEditing ? "2-4" : "",
    duration: isEditing ? "5" : "",
    nights: isEditing ? "4" : "",
    description: isEditing
      ? "Disfruta de una experiencia inolvidable en la hermosa ciudad de Cartagena. Este paquete incluye alojamiento en un hotel boutique ubicado en el corazón de la Ciudad Amurallada, a pocos pasos de los principales atractivos turísticos."
      : "",
    longDescription: isEditing
      ? "Cartagena de Indias, declarada Patrimonio de la Humanidad por la UNESCO, es una de las joyas del Caribe colombiano. Sus calles coloniales, sus fortificaciones y su rica historia la convierten en un destino imperdible.\n\nNuestro paquete incluye:\n- 4 noches de alojamiento en hotel boutique en la Ciudad Amurallada\n- Desayunos diarios\n- Traslados aeropuerto-hotel-aeropuerto\n- Tour guiado por la Ciudad Amurallada\n- Visita al Castillo de San Felipe\n- Tarde libre para disfrutar de las playas\n- Cena de despedida en restaurante típico"
      : "",
    itinerary: isEditing
      ? "Día 1: Llegada a Cartagena\nRecepción en el aeropuerto y traslado al hotel. Check-in y tiempo libre para explorar los alrededores.\n\nDía 2: Tour Ciudad Amurallada\nDesayuno en el hotel. Tour guiado por la Ciudad Amurallada, visitando la Plaza de los Coches, Plaza de la Aduana, Plaza de Bolívar y la Catedral. Tarde libre."
      : "",
    includes: isEditing ? ["Alojamiento", "Desayunos", "Traslados", "Tour guiado"] : [],
    amenities: isEditing
      ? [
          "Wi-Fi gratis",
          "Piscina",
          "Desayuno incluido",
          "Ubicación céntrica",
          "Cancelación gratuita",
          "Traslados incluidos",
        ]
      : [],
    tags: isEditing ? ["PLAYA", "CULTURAL", "RELAX"] : [],
    status: isEditing ? "active" : "draft",
    featured: isEditing,
  })

  // Estado para las imágenes
  const [images, setImages] = useState(
    isEditing
      ? [
          { id: 1, url: "https://v0.dev/placeholder.svg?height=200&width=300", main: true },
          { id: 2, url: "https://v0.dev/placeholder.svg?height=200&width=300&text=Habitación", main: false },
          { id: 3, url: "https://v0.dev/placeholder.svg?height=200&width=300&text=Piscina", main: false },
        ]
      : [],
  )

  // Estado para nuevos campos
  const [newInclude, setNewInclude] = useState("")
  const [newAmenity, setNewAmenity] = useState("")
  const [newTag, setNewTag] = useState("")

  // Manejadores de eventos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAddInclude = () => {
    if (newInclude.trim()) {
      setFormData({
        ...formData,
        includes: [...formData.includes, newInclude.trim()],
      })
      setNewInclude("")
    }
  }

  const handleRemoveInclude = (index) => {
    const newIncludes = [...formData.includes]
    newIncludes.splice(index, 1)
    setFormData({
      ...formData,
      includes: newIncludes,
    })
  }

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()],
      })
      setNewAmenity("")
    }
  }

  const handleRemoveAmenity = (index) => {
    const newAmenities = [...formData.amenities]
    newAmenities.splice(index, 1)
    setFormData({
      ...formData,
      amenities: newAmenities,
    })
  }

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim().toUpperCase()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (index) => {
    const newTags = [...formData.tags]
    newTags.splice(index, 1)
    setFormData({
      ...formData,
      tags: newTags,
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      main: images.length === 0 && index === 0, // Primera imagen como principal si no hay otras
      file,
    }))

    setImages([...images, ...newImages])
  }

  const handleRemoveImage = (id) => {
    const newImages = images.filter((img) => img.id !== id)

    // Si eliminamos la imagen principal, establecer la primera como principal
    if (images.find((img) => img.id === id)?.main && newImages.length > 0) {
      newImages[0].main = true
    }

    setImages(newImages)
  }

  const handleSetMainImage = (id) => {
    const newImages = images.map((img) => ({
      ...img,
      main: img.id === id,
    }))

    setImages(newImages)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al backend
    console.log("Formulario enviado:", { ...formData, images })
    // Redireccionar a la lista de paquetes
    // history.push("/guide/packages")
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Header title={isEditing ? "Editar Paquete" : "Crear Nuevo Paquete"} />

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
                      <div className="col-md-4">
                        <label htmlFor="nights" className="form-label">
                          Noches *
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="nights"
                          name="nights"
                          value={formData.nights}
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

                {/* Características */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Características</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <label className="form-label">Incluye *</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Añadir elemento incluido"
                          value={newInclude}
                          onChange={(e) => setNewInclude(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddInclude())}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleAddInclude}>
                          Añadir
                        </button>
                      </div>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {formData.includes.map((item, index) => (
                          <div key={index} className="badge bg-light text-dark p-2 d-flex align-items-center">
                            {item}
                            <button
                              type="button"
                              className="btn-close ms-2"
                              style={{ fontSize: "0.5rem" }}
                              onClick={() => handleRemoveInclude(index)}
                            ></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Amenidades</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Añadir amenidad"
                          value={newAmenity}
                          onChange={(e) => setNewAmenity(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAmenity())}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleAddAmenity}>
                          Añadir
                        </button>
                      </div>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {formData.amenities.map((item, index) => (
                          <div key={index} className="badge bg-light text-dark p-2 d-flex align-items-center">
                            {item}
                            <button
                              type="button"
                              className="btn-close ms-2"
                              style={{ fontSize: "0.5rem" }}
                              onClick={() => handleRemoveAmenity(index)}
                            ></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Etiquetas</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Añadir etiqueta"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleAddTag}>
                          Añadir
                        </button>
                      </div>
                      <div className="form-text">Las etiquetas ayudan a categorizar y filtrar los paquetes.</div>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag, index) => (
                          <div key={index} className="badge bg-primary p-2 d-flex align-items-center">
                            {tag}
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-2"
                              style={{ fontSize: "0.5rem" }}
                              onClick={() => handleRemoveTag(index)}
                            ></button>
                          </div>
                        ))}
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
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        Estado
                      </label>
                      <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="draft">Borrador</option>
                        <option value="active">Publicado</option>
                        <option value="inactive">Inactivo</option>
                      </select>
                    </div>

                    <div className="form-check form-switch mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="featured">
                        Destacar paquete
                      </label>
                      <div className="form-text">Los paquetes destacados aparecen en la página principal.</div>
                    </div>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        {isEditing ? "Actualizar Paquete" : "Crear Paquete"}
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
                        {formData.featured && (
                          <div className="position-absolute top-0 end-0 bg-warning text-white m-2 px-2 py-1 rounded-pill">
                            <small>DESTACADO</small>
                          </div>
                        )}
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
                        <div className="mb-2">
                          {formData.tags.map((tag, index) => (
                            <span key={index} className="badge bg-light text-dark me-1">
                              {tag}
                            </span>
                          ))}
                        </div>
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
  )
}

export default PackageForm
