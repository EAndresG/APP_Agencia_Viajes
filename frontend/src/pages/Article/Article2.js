import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../Articulo.css";

function Articulo() {
  const articleUrl = "https://www.tu-sitio.com/articulo2"; // URL del artículo
  const articleTitle = "Consejos para viajar solo";

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <header className="mb-4 pb-3 border-bottom">
              <h1 className="display-4 mb-3">Consejos para viajar solo</h1>
              <div className="text-muted d-flex gap-3 mb-3">
                <span>Por: Juan Pérez</span>
                <span>Publicado: 20 de abril, 2025</span>
              </div>
            </header>

            <figure className="figure mb-4">
              <img
                src="https://cuidateplus.marca.com/sites/default/files/styles/natural/public/cms/2022-07/viajar-solo.jpg.webp?itok=5QMb8Oi6"
                alt="Viajar solo"
                className="figure-img img-fluid rounded shadow-sm"
              />
              <figcaption className="figure-caption text-center fst-italic">
                Viajar solo puede ser una experiencia transformadora
              </figcaption>
            </figure>

            <div className="mb-4">
              <p className="lead mb-4">
                Viajar solo es una de las experiencias más enriquecedoras que puedes vivir. Te permite conocerte mejor,
                salir de tu zona de confort y disfrutar de una libertad absoluta para decidir qué hacer y cuándo hacerlo.
                Sin embargo, también puede ser un desafío si no estás preparado. En este artículo, te compartimos
                consejos prácticos para que tu aventura en solitario sea segura y memorable.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">1. Investiga tu destino</h2>
              <p className="mb-4">
                Antes de viajar, investiga a fondo tu destino. Aprende sobre la cultura, las costumbres locales y las
                áreas seguras para visitar. Esto no solo te ayudará a evitar problemas, sino que también te permitirá
                disfrutar más de tu experiencia. Además, busca recomendaciones de otros viajeros que hayan visitado el
                lugar, ya que pueden darte consejos valiosos sobre qué hacer y qué evitar.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">2. Mantén a alguien informado</h2>
              <p className="mb-4">
                Comparte tu itinerario con un amigo o familiar de confianza. Mantente en contacto regularmente para que
                sepan que estás bien. Esto es especialmente importante si planeas explorar áreas remotas o realizar
                actividades de aventura. Además, considera llevar un dispositivo de comunicación de emergencia si vas a
                lugares donde la señal de celular es limitada.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">3. Sé flexible pero organizado</h2>
              <p className="mb-4">
                Aunque viajar solo te da la libertad de cambiar tus planes, es útil tener un itinerario básico. Esto te
                ayudará a aprovechar al máximo tu tiempo y evitar sentirte perdido o abrumado. Sin embargo, deja espacio
                para la espontaneidad. Algunas de las mejores experiencias de viaje ocurren cuando te permites explorar
                sin un plan rígido.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">4. Confía en tu intuición</h2>
              <p className="mb-4">
                Si algo no se siente bien, confía en tu instinto. Ya sea un lugar, una persona o una situación, es mejor
                ser precavido y evitar riesgos innecesarios. No tengas miedo de decir "no" o de alejarte de algo que no
                te haga sentir cómodo. Tu seguridad siempre debe ser tu prioridad.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">5. Disfruta de tu propia compañía</h2>
              <p className="mb-4">
                Aprovecha el tiempo para reflexionar, leer, escribir o simplemente disfrutar del momento. Viajar solo es
                una oportunidad única para conectar contigo mismo y descubrir lo que realmente te hace feliz. No tengas
                miedo de comer solo en un restaurante o de explorar un museo por tu cuenta. Estas experiencias pueden
                ser increíblemente gratificantes.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">6. Conecta con otros viajeros</h2>
              <p className="mb-4">
                Aunque viajes solo, no significa que tengas que estar aislado. Hospédate en hostales o participa en
                actividades grupales para conocer a otros viajeros. Estas interacciones pueden enriquecer tu experiencia
                y darte la oportunidad de hacer amigos de diferentes partes del mundo.
              </p>
            </div>

            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge bg-light text-dark">Viajar solo</span>
                <span className="badge bg-light text-dark">Consejos</span>
                <span className="badge bg-light text-dark">Aventura</span>
                <span className="badge bg-light text-dark">Exploración</span>
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