import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../Articulo.css";

function Articulo() {
  const articleUrl = "https://www.tu-sitio.com/articulo3"; // URL del artículo
  const articleTitle = "Las mejores temporadas para viajar";

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <header className="mb-4 pb-3 border-bottom">
              <h1 className="display-4 mb-3">Las mejores temporadas para viajar</h1>
              <div className="text-muted d-flex gap-3 mb-3">
                <span>Por: Ana Gómez</span>
                <span>Publicado: 25 de abril, 2025</span>
              </div>
            </header>

            <figure className="figure mb-4">
              <img
                src="https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/v1/guides/section_image/blavomfn3isievxessys"
                alt="Temporadas para viajar"
                className="figure-img img-fluid rounded shadow-sm"
              />
              <figcaption className="figure-caption text-center fst-italic">
                Elegir la temporada adecuada puede marcar la diferencia en tu experiencia de viaje
              </figcaption>
            </figure>

            <div className="mb-4">
              <p className="lead mb-4">
                Elegir la temporada adecuada para viajar puede marcar una gran diferencia en tu experiencia. Desde
                evitar multitudes hasta ahorrar dinero, planificar tu viaje en el momento correcto es clave. En este
                artículo, exploramos las mejores temporadas para viajar según tus objetivos y preferencias.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">1. Temporada alta</h2>
              <p className="mb-4">
                La temporada alta suele coincidir con las vacaciones escolares y los meses de verano. Aunque los precios
                son más altos y los destinos están más concurridos, es ideal si buscas un ambiente animado y eventos
                especiales. Durante esta temporada, muchos destinos ofrecen actividades exclusivas, como festivales,
                conciertos y mercados locales, que pueden enriquecer tu experiencia de viaje.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">2. Temporada baja</h2>
              <p className="mb-4">
                Si prefieres evitar multitudes y ahorrar dinero, la temporada baja es perfecta. Los precios de vuelos y
                alojamiento suelen ser más bajos, y tendrás más tranquilidad para explorar los destinos. Sin embargo,
                ten en cuenta que algunos servicios turísticos pueden estar limitados durante esta temporada, como
                restaurantes o actividades específicas. Aun así, es una excelente oportunidad para disfrutar de una
                experiencia más relajada y auténtica.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">3. Temporada intermedia</h2>
              <p className="mb-4">
                También conocida como temporada media, es un equilibrio entre la alta y la baja. Los precios son
                razonables y los destinos no están tan llenos, lo que la convierte en una excelente opción para muchos
                viajeros. Además, el clima suele ser más favorable en esta época, lo que te permitirá disfrutar de tus
                actividades al aire libre sin preocuparte por temperaturas extremas o lluvias constantes.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">4. Considera el clima</h2>
              <p className="mb-4">
                Investiga el clima de tu destino antes de viajar. Algunas actividades, como el esquí o el buceo, dependen
                de condiciones climáticas específicas, por lo que es importante planificar en consecuencia. Por ejemplo,
                si planeas visitar una playa tropical, asegúrate de evitar la temporada de huracanes. Por otro lado, si
                prefieres destinos de montaña, verifica las condiciones de nieve o senderismo según la época del año.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">5. Eventos locales</h2>
              <p className="mb-4">
                Muchas personas planifican sus viajes en torno a festivales o eventos locales. Aunque puede ser más caro,
                asistir a un evento único puede hacer que tu viaje sea inolvidable. Desde carnavales hasta celebraciones
                culturales, estos eventos te permiten sumergirte en la cultura local y vivir experiencias que no
                encontrarás en ningún otro momento del año.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">6. Temporadas según el destino</h2>
              <p className="mb-4">
                Cada destino tiene su propia temporada ideal para visitar. Por ejemplo, Europa es popular en verano por
                su clima cálido y festivales al aire libre, mientras que Asia puede ser mejor durante el invierno para
                evitar el calor extremo. Investiga las particularidades de tu destino para asegurarte de elegir el mejor
                momento para viajar.
              </p>
            </div>

            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge bg-light text-dark">Temporadas</span>
                <span className="badge bg-light text-dark">Viajes</span>
                <span className="badge bg-light text-dark">Consejos</span>
                <span className="badge bg-light text-dark">Clima</span>
              </div>
            </div>

            <div className="bg-light p-4 rounded mb-5">
              <h3 className="h5 mb-3">Compartir este artículo</h3>
              <div className="d-flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(articleTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info text-white"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(articleTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Articulo;