"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"

const Login = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState("user") // "user" o "guide"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validar email
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simulación de inicio de sesión (reemplazar con llamada real a API)
      setTimeout(() => {
        setIsLoading(false)

        // Redireccionar según el tipo de usuario
        if (userType === "guide") {
          navigate("/guide/dashboard")
        } else {
          navigate("/")
        }

        // Aquí se guardaría el token y la información del usuario en localStorage o en un estado global
        console.log("Inicio de sesión exitoso como:", userType, formData)
      }, 1500)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="row g-0">
          {/* Imagen lateral */}
          <div className="col-lg-6 d-none d-lg-block">
            <div
              className="auth-image"
              style={{
                backgroundImage: "url('https://v0.dev/placeholder.svg?height=800&width=600')",
              }}
            >
              <div className="auth-image-overlay">
                <div className="auth-image-content">
                  <h2 className="display-6 text-white mb-4">Descubre experiencias únicas</h2>
                  <p className="text-white mb-4">
                    Explora los mejores destinos turísticos con guías expertos y paquetes personalizados.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="col-lg-6">
            <div className="auth-form-container">
              <div className="text-center mb-4">
                <Link to="/" className="text-decoration-none">
                  <h1 className="h3 font-script text-primary">Private Holidays</h1>
                </Link>
                <h2 className="h4 mt-3">Iniciar Sesión</h2>
                <p className="text-muted">Ingresa tus credenciales para acceder</p>
              </div>

              {/* Selector de tipo de usuario */}
              <div className="user-type-selector mb-4">
                <div className="btn-group w-100" role="group">
                  <button
                    type="button"
                    className={`btn ${userType === "user" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setUserType("user")}
                  >
                    <i className="bi bi-person me-2"></i>
                    Usuario
                  </button>
                  <button
                    type="button"
                    className={`btn ${userType === "guide" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setUserType("guide")}
                  >
                    <i className="bi bi-compass me-2"></i>
                    Guía Turístico
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className={`form-control border-start-0 ${errors.email ? "is-invalid" : ""}`}
                      id="email"
                      name="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="password" className="form-label mb-0">
                      Contraseña
                    </label>
                    <Link to="/forgot-password" className="text-decoration-none small">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control border-start-0 ${errors.password ? "is-invalid" : ""}`}
                      id="password"
                      name="password"
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Recordar mi sesión
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Iniciando sesión....
                    </>
                  ) : (
                    <>Iniciar Sesión</>
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-decoration-none">
                      Regístrate
                    </Link>
                  </p>
                </div>
              </form>

              <div className="mt-4 pt-3 border-top">
                <p className="text-center text-muted small mb-0">
                  Al iniciar sesión, aceptas nuestros{" "}
                  <a href="#" className="text-decoration-none">
                    Términos y Condiciones
                  </a>{" "}
                  y{" "}
                  <a href="#" className="text-decoration-none">
                    Política de Privacidad
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
