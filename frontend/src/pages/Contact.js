import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado. Nos pondremos en contacto contigo pronto.");
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4">Contáctanos</h1>
        <p className="text-center text-muted mb-5">
          ¿Tienes alguna pregunta o necesitas más información? ¡Estamos aquí para ayudarte!
        </p>

        <div className="row g-4">
          {/* Información de contacto */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Información de contacto</h5>
                <p className="mb-2">
                  <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                  Dirección: Calle 123, Bogotá, Colombia
                </p>
                <p className="mb-2">
                  <i className="bi bi-telephone-fill text-primary me-2"></i>
                  Teléfono: +57 300 123 4567
                </p>
                <p className="mb-2">
                  <i className="bi bi-envelope-fill text-primary me-2"></i>
                  Correo: info@privateholidays.com
                </p>
                <p>
                  <i className="bi bi-clock-fill text-primary me-2"></i>
                  Horario: Lunes a Viernes, 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Envíanos un mensaje</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Tu correo electrónico"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Mensaje
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      placeholder="Escribe tu mensaje aquí..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;