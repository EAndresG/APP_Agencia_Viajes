import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../Articulo.css";

function Articulo() {
  const articleUrl = "https://www.tu-sitio.com/articulo1"; // URL del artículo
  const articleTitle = "Consejos para ahorrar para tus viajes";

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <header className="mb-4 pb-3 border-bottom">
              <h1 className="display-4 mb-3">Consejos para ahorrar para tus viajes</h1>
              <div className="text-muted d-flex gap-3 mb-3">
                <span>Por: María López</span>
                <span>Publicado: 15 de abril, 2025</span>
              </div>
            </header>

            <figure className="figure mb-4">
              <img
                src="https://media.admagazine.com/photos/618a5e91532cae908aaf29d4/master/w_2560%2Cc_limit/92316.jpg"
                alt="Ahorro para viajes"
                className="figure-img img-fluid rounded shadow-sm"
              />
              <figcaption className="figure-caption text-center fst-italic">
                Ahorrar para tus viajes puede ser más fácil de lo que imaginas
              </figcaption>
            </figure>

            <div className="mb-4">
              <p className="lead mb-4">
                Viajar es una de las experiencias más enriquecedoras que podemos vivir. Sin embargo, muchas veces el
                costo asociado a los viajes puede parecer un obstáculo insuperable. La buena noticia es que, con una
                planificación adecuada y algunos ajustes en tus hábitos financieros, puedes hacer realidad tus sueños
                de explorar el mundo. En este artículo, te compartimos estrategias prácticas y efectivas para ahorrar
                dinero y disfrutar de tus aventuras sin preocupaciones.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">1. Establece un presupuesto claro</h2>
              <p className="mb-4">
                Antes de comenzar a ahorrar, es fundamental que tengas una idea clara de cuánto dinero necesitas para tu
                viaje. Investiga los costos de transporte, alojamiento, comida, actividades y cualquier otro gasto
                relacionado con tu destino. Una vez que tengas esta información, establece un presupuesto realista que
                te permita alcanzar tu meta sin comprometer tus finanzas personales. Recuerda incluir un margen para
                imprevistos, ya que siempre pueden surgir gastos inesperados durante el viaje.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">2. Crea un fondo de ahorro exclusivo</h2>
              <p className="mb-4">
                Una de las mejores formas de mantenerte enfocado en tu objetivo es abrir una cuenta de ahorros
                exclusivamente para tus viajes. Deposita una cantidad fija cada mes y evita usar ese dinero para otros
                gastos. Si es posible, configura transferencias automáticas desde tu cuenta principal para que el
                ahorro sea constante y sin esfuerzo. Además, considera guardar cualquier ingreso extra, como bonos o
                regalos, en este fondo para acelerar el proceso.
              </p>

              <blockquote className="blockquote border-start border-4 border-primary ps-4 my-5">
                <p className="fs-5 fst-italic text-secondary">
                  "Ahorrar no significa renunciar a todo, sino priorizar lo que realmente importa."
                </p>
              </blockquote>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">3. Reduce gastos innecesarios</h2>
              <p className="mb-4">
                Identifica en qué estás gastando más de la cuenta y busca formas de reducir esos gastos. Por ejemplo,
                puedes limitar las salidas a restaurantes, cancelar suscripciones que no utilizas o evitar compras
                impulsivas. Cada pequeño ajuste puede marcar una gran diferencia a largo plazo. Además, considera
                alternativas más económicas para tus actividades diarias, como cocinar en casa en lugar de pedir comida
                a domicilio o usar transporte público en lugar de taxis.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">4. Aprovecha ofertas y descuentos</h2>
              <p className="mb-4">
                Mantente atento a las promociones y descuentos que ofrecen las aerolíneas, agencias de viajes y hoteles.
                Suscríbete a boletines informativos y sigue sus redes sociales para estar al tanto de las mejores
                ofertas. También puedes utilizar aplicaciones y sitios web especializados en comparar precios para
                asegurarte de obtener el mejor trato. Si tienes flexibilidad en tus fechas de viaje, considera viajar en
                temporada baja, ya que los precios suelen ser significativamente más bajos.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">5. Planifica con anticipación</h2>
              <p className="mb-4">
                La planificación es clave para ahorrar dinero en tus viajes. Reservar vuelos, alojamiento y actividades
                con anticipación no solo te permitirá acceder a mejores precios, sino que también te ayudará a evitar
                gastos de última hora. Además, al planificar tus itinerarios con tiempo, podrás identificar las
                actividades gratuitas o de bajo costo disponibles en tu destino, lo que te permitirá disfrutar más sin
                gastar de más.
              </p>
            </div>

            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge bg-light text-dark">Ahorro</span>
                <span className="badge bg-light text-dark">Viajes</span>
                <span className="badge bg-light text-dark">Consejos</span>
                <span className="badge bg-light text-dark">Presupuesto</span>
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
