import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="mb-3 font-script h3">Private Holidays</h5>
            <p className="mb-4">
              Ofrecemos experiencias de viaje inolvidables con atención personalizada y destinos exclusivos.
            </p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" className="text-white">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
            <h5 className="mb-3">Enlaces</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/packages" className="text-white text-decoration-none">
                  Paquetes
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/userprofile" className="text-white text-decoration-none">
                  Mi Perfil
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4 mb-4">
            <h5 className="mb-3">Destinos populares</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/packages" className="text-white text-decoration-none">
                  Cartagena
                </a>
              </li>
              <li className="mb-2">
                <a href="/packages" className="text-white text-decoration-none">
                  San Andrés
                </a>
              </li>
              <li className="mb-2">
                <a href="/packages" className="text-white text-decoration-none">
                  Medellín
                </a>
              </li>
              <li className="mb-2">
                <a href="/packages" className="text-white text-decoration-none">
                  Santa Marta
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-4 mb-4">
            <h5 className="mb-3">Contacto</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                <span>Calle 55 #45-67, Cali</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-telephone me-2"></i>
                <span>+57 300 123 4567</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-envelope me-2"></i>
                <span>info@privateholidays.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">&copy; 2025 Private Holidays. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a href="https://policies.google.com/terms?hl=es" className="text-white text-decoration-none me-3">
              Términos y condiciones
            </a>
            <a href="https://policies.google.com/privacy?hl=es" className="text-white text-decoration-none">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
