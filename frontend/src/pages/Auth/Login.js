"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { useState } from "react"; // Manejo de estado
import { Link, useNavigate } from "react-router-dom"; // Navegación entre rutas
import API_BASE_URL from "../../apiConfig"; // URL base del backend
import "./Auth.css"; // Estilos personalizados para la página de autenticación

// Componente principal para el inicio de sesión
const Login = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario
  const [userType, setUserType] = useState("user"); // Tipo de usuario: "user" o "guide"
  const [formData, setFormData] = useState({
    email: "", // Correo electrónico del usuario
    password: "", // Contraseña del usuario
  });
  const [errors, setErrors] = useState({}); // Errores de validación del formulario
  const [isLoading, setIsLoading] = useState(false); // Estado de carga al enviar el formulario

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar errores cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validar el formulario antes de enviarlo
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
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    if (validateForm()) {
      setIsLoading(true); // Mostrar estado de carga

      try {
        // Enviar solicitud al backend para iniciar sesión
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
          // Guardar el token en el almacenamiento local
          localStorage.setItem("token", data.token);

          // Emitir un evento para notificar cambios en la autenticación
          window.dispatchEvent(new Event("authChange"));

          // Redirigir según el tipo de usuario
          if (data.userType === "guide") {
            navigate("/guide/dashboard");
          } else {
            navigate("/");
          }
        } else {
          alert(data.message || "Error al iniciar sesión.");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Ocurrió un error al iniciar sesión.");
      } finally {
        setIsLoading(false); // Ocultar estado de carga
      }
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
                backgroundImage: "url('https://irp-cdn.multiscreensite.com/md/unsplash/dms3rep/multi/photo-1544219748-7bad90ba5f7c.jpg')",
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
                {/* Campo de correo electrónico */}
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

                {/* Campo de contraseña */}
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

                {/* Botón de inicio de sesión */}
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
  );
};

export default Login; // Exportar el componente para usarlo en otras partes de la aplicación
