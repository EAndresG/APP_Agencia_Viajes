"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig"; // Importar la URL base del backend
import "./Auth.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Guardar el token en localStorage
        navigate("/admin/dashboard"); // Redirigir al dashboard
      } else {
        alert(data.message || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error al iniciar sesión.");
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
                  <h2 className="display-6 text-white mb-4">Bienvenido Administrador</h2>
                  <p className="text-white mb-4">
                    Gestiona usuarios, paquetes y reservas desde tu panel de control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="col-lg-6">
            <div className="auth-form-container">
              <div className="text-center mb-4">
                <h1 className="h3 font-script text-primary">Private Holidays</h1>
                <h2 className="h4 mt-3">Iniciar Sesión</h2>
                <p className="text-muted">Ingresa tus credenciales para acceder</p>
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
                      placeholder="Tu contraseña"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    <>Iniciar Sesión</>
                  )}
                </button>
              </form>

              <div className="mt-4 pt-3 border-top">
                <p className="text-center text-muted small mb-3">
                  ¿No tienes una cuenta?{" "}
                  <a
                    href="/admin/register"
                    className="text-decoration-none text-primary"
                  >
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;