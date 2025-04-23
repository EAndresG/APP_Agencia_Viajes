"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user"); // "user" o "guide"
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo electrónico no es válido";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es obligatorio";
    if (!formData.password.trim()) newErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos y condiciones";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        navigate("/login");
      } else {
        alert(data.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Ocurrió un error al registrar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };

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
                  <h2 className="display-6 text-white mb-4">Únete a nuestra comunidad</h2>
                  <p className="text-white mb-4">
                    Regístrate para descubrir experiencias únicas y planificar tus próximas vacaciones.
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
                <h2 className="h4 mt-3">Crear una cuenta</h2>
                <p className="text-muted">Completa el formulario para registrarte</p>
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
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

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

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Teléfono
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-phone"></i>
                    </span>
                    <input
                      type="tel"
                      className={`form-control border-start-0 ${errors.phone ? "is-invalid" : ""}`}
                      id="phone"
                      name="phone"
                      placeholder="+57 300 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control border-start-0 ${errors.password ? "is-invalid" : ""}`}
                      id="password"
                      name="password"
                      placeholder="Mínimo 8 caracteres"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control border-start-0 ${errors.confirmPassword ? "is-invalid" : ""}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      Acepto los{" "}
                      <a href="#" className="text-decoration-none">
                        Términos y Condiciones
                      </a>{" "}
                      y{" "}
                      <a href="#" className="text-decoration-none">
                        Política de Privacidad
                      </a>
                    </label>
                  </div>
                  {errors.acceptTerms && <div className="text-danger small">{errors.acceptTerms}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Registrando...
                    </>
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
