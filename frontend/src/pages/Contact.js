import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4">Contáctanos</h1>
        <p className="text-center text-muted mb-5">
          ¿Tienes alguna pregunta o necesitas más información? ¡Estamos aquí para ayudarte!
        </p>

        <div className="row justify-content-center">
          {/* Información de contacto */}
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body">
                <h5 className="card-title mb-4 text-center text-uppercase fw-bold">Información de contacto</h5>
                <p className="mb-3 text-start">
                  <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                  <strong>Dirección:</strong> Calle 123, Bogotá, Colombia
                </p>
                <p className="mb-3 text-start">
                  <i className="bi bi-telephone-fill text-primary me-2"></i>
                  <strong>Teléfono:</strong> +57 300 123 4567
                </p>
                <p className="mb-3 text-start">
                  <i className="bi bi-envelope-fill text-primary me-2"></i>
                  <strong>Correo:</strong> info@privateholidays.com
                </p>
                <p className="mb-4 text-start">
                  <i className="bi bi-clock-fill text-primary me-2"></i>
                  <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM
                </p>

                {/* Botones de redes sociales */}
                <div className="d-flex justify-content-center gap-3">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary rounded-pill px-4"
                  >
                    <i className="bi bi-facebook me-2"></i>Facebook
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-danger rounded-pill px-4"
                  >
                    <i className="bi bi-instagram me-2"></i>Instagram
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-info rounded-pill px-4"
                  >
                    <i className="bi bi-twitter me-2"></i>Twitter
                  </a>
                </div>
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