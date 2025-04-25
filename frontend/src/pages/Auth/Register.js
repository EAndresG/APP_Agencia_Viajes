"use client"; // Indica que este componente se ejecuta en el cliente

// Importar dependencias necesarias
import { useState } from "react"; // Manejo de estado
import { Link, useNavigate } from "react-router-dom"; // Navegación entre rutas
import API_BASE_URL from "../../apiConfig"; // URL base del backend
import "./Auth.css"; // Estilos personalizados para la página de autenticación

// Componente principal para el registro de usuarios
const Register = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario
  const [userType, setUserType] = useState("user"); // Tipo de usuario: "user" o "guide"
  const [step, setStep] = useState(1); // Paso actual del formulario (1 o 2)
  const [formData, setFormData] = useState({
    firstName: "", // Nombre del usuario
    lastName: "", // Apellido del usuario
    email: "", // Correo electrónico
    password: "", // Contraseña
    confirmPassword: "", // Confirmación de contraseña
    phone: "", // Teléfono
    description: "", // Descripción profesional (solo para guías)
    identification: "", // Número de identificación (solo para guías)
    acceptTerms: false, // Aceptación de términos y condiciones
  });
  const [errors, setErrors] = useState({}); // Errores de validación del formulario
  const [isLoading, setIsLoading] = useState(false); // Estado de carga al enviar el formulario

  // Manejar cambios en los campos del formulario
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

  // Validar los campos del paso 1
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
    if (!formData.email) newErrors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo electrónico no es válido";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    else if (formData.password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!formData.phone) newErrors.phone = "El teléfono es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validar los campos del paso 2
  const validateStep2 = () => {
    const newErrors = {};
    if (userType === "guide") {
      if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
      if (!formData.identification.trim()) newErrors.identification = "El número de identificación es obligatorio";
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos y condiciones";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el cambio al siguiente paso
  const handleNextStep = () => {
    if (validateStep1()) setStep(2);
  };

  // Manejar el regreso al paso anterior
  const handlePrevStep = () => {
    setStep(1);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      handleNextStep();
      return;
    }

    if (validateStep2()) {
      setIsLoading(true);

      try {
        // Enviar solicitud al backend para registrar al usuario
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            userType,
            acceptTerms: formData.acceptTerms,
            ...(userType === "guide" && {
              description: formData.description,
              identification: formData.identification,
            }),
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
                backgroundImage: "url('https://www.kayak.com.co/news/wp-content/uploads/sites/180/2018/07/Playas-baratas-en-Mexico-Mahahual.jpg')",
              }}
            >
              <div className="auth-image-overlay">
                <div className="auth-image-content">
                  <h2 className="display-6 text-white mb-4">Únete a nuestra comunidad</h2>
                  <p className="text-white mb-4">
                    {userType === "user"
                      ? "Regístrate para descubrir experiencias únicas y planificar tus próximas vacaciones."
                      : "Conviértete en guía turístico y comparte tu pasión por los viajes con viajeros de todo el mundo."}
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

              {/* Formulario dinámico basado en el paso */}
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  // Paso 1: Información personal
                  <>
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

                    <button type="button" className="btn btn-primary w-100" onClick={handleNextStep}>
                      Continuar
                    </button>
                  </>
                ) : (
                  // Paso 2: Información profesional (para guías) o finalización (para usuarios)
                  <>
                    {userType === "guide" ? (
                      // Campos adicionales para guías
                      <>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            Descripción Profesional
                          </label>
                          <textarea
                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                            id="description"
                            name="description"
                            rows="3"
                            placeholder="Describe tu experiencia y lo que ofreces como guía turístico"
                            value={formData.description}
                            onChange={handleChange}
                          ></textarea>
                          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="identification" className="form-label">
                            Número de Identificación
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.identification ? "is-invalid" : ""}`}
                            id="identification"
                            name="identification"
                            placeholder="Cédula o documento de identidad"
                            value={formData.identification}
                            onChange={handleChange}
                          />
                          {errors.identification && <div className="invalid-feedback">{errors.identification}</div>}
                          <div className="form-text">
                            Este dato es necesario para verificar tu identidad como guía turístico.
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className="mb-4">
                      <div className={`form-check ${errors.acceptTerms ? "is-invalid" : ""}`}>
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

                    <div className="d-flex gap-2 mb-4">
                      <button type="button" className="btn btn-outline-secondary flex-grow-1" onClick={handlePrevStep}>
                        Atrás
                      </button>
                      <button type="submit" className="btn btn-primary flex-grow-1" disabled={isLoading}>
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
                          <>Completar Registro</>
                        )}
                      </button>
                    </div>
                  </>
                )}

                <div className="text-center mt-3">
                  <p className="mb-0">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login" className="text-decoration-none">
                      Inicia sesión
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; // Exportar el componente para usarlo en otras partes de la aplicación