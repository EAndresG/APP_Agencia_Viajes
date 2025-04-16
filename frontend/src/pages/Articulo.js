import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import "./Articulo.css"

function Articulo() {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <header className="mb-4 pb-3 border-bottom">
              <h1 className="display-4 mb-3">El futuro de la tecnología en Latinoamérica</h1>
              <div className="text-muted d-flex gap-3 mb-3">
                <span>Por: Juan Pérez</span>
                <span>Publicado: 15 de abril, 2025</span>
              </div>
            </header>

            <figure className="figure mb-4">
              <img
                src="https://v0.dev/placeholder.svg?height=400&width=800"
                alt="Imagen representativa de tecnología"
                className="figure-img img-fluid rounded shadow-sm"
              />
              <figcaption className="figure-caption text-center fst-italic">
                La evolución tecnológica está transformando la región
              </figcaption>
            </figure>

            <div className="mb-4">
              <p className="lead mb-4">
                La transformación digital en Latinoamérica está avanzando a pasos agigantados, creando nuevas
                oportunidades para emprendedores y empresas establecidas por igual.
              </p>

              <p className="mb-4">
                En los últimos años, hemos sido testigos de un crecimiento sin precedentes en el ecosistema tecnológico
                latinoamericano. Desde startups innovadoras hasta grandes corporaciones que adoptan nuevas tecnologías,
                la región está experimentando una verdadera revolución digital.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">El auge de las startups tecnológicas</h2>

              <p className="mb-4">
                El número de startups en la región ha crecido exponencialmente, con países como Brasil, México, Colombia
                y Argentina liderando el camino. Estas nuevas empresas están abordando problemas locales con soluciones
                innovadoras, desde fintech hasta agritech.
              </p>

              <blockquote className="blockquote border-start border-4 border-primary ps-4 my-5">
                <p className="fs-5 fst-italic text-secondary">
                  "La tecnología está democratizando el acceso a servicios que antes estaban reservados para unos pocos,
                  transformando la vida de millones de latinoamericanos."
                </p>
              </blockquote>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">Desafíos y oportunidades</h2>

              <p className="mb-4">
                A pesar del progreso, la región enfrenta desafíos significativos. La brecha digital sigue siendo un
                problema, con millones de personas sin acceso a internet de alta velocidad. Sin embargo, esto también
                representa una oportunidad para innovadores que buscan conectar a la próxima generación de usuarios.
              </p>

              <p className="mb-4">
                La educación tecnológica es otro campo con enorme potencial. Programas de capacitación en habilidades
                digitales están ayudando a formar la próxima generación de desarrolladores y emprendedores tecnológicos.
              </p>

              <h2 className="h3 mt-5 mb-3 pb-2 border-bottom">El futuro es prometedor</h2>

              <p className="mb-4">
                Con una población joven y cada vez más conectada, Latinoamérica está posicionada para convertirse en un
                importante centro de innovación tecnológica. Las inversiones en el sector continúan creciendo, y los
                gobiernos están implementando políticas para fomentar el desarrollo tecnológico.
              </p>

              <p className="mb-4">
                El futuro de la tecnología en la región es brillante, y estamos apenas viendo el comienzo de lo que
                promete ser una transformación fundamental en la economía y sociedad latinoamericana.
              </p>
            </div>

            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge bg-light text-dark">Tecnología</span>
                <span className="badge bg-light text-dark">Latinoamérica</span>
                <span className="badge bg-light text-dark">Innovación</span>
                <span className="badge bg-light text-dark">Digital</span>
              </div>
            </div>

            <div className="bg-light p-4 rounded mb-5">
              <h3 className="h5 mb-3">Compartir este artículo</h3>
              <div className="d-flex gap-2">
                <button className="btn btn-primary">Facebook</button>
                <button className="btn btn-info text-white">Twitter</button>
                <button className="btn btn-secondary">LinkedIn</button>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="h4 mb-4 pb-2 border-bottom">Artículos relacionados</h3>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h4 className="card-title h5">Las 10 startups más prometedoras de 2025</h4>
                      <p className="card-text">
                        Descubre las empresas emergentes que están revolucionando el mercado...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h4 className="card-title h5">Inteligencia Artificial en la educación latinoamericana</h4>
                      <p className="card-text">Cómo la IA está transformando las aulas en toda la región...</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h4 className="card-title h5">El auge de las fintech en México</h4>
                      <p className="card-text">
                        El ecosistema financiero digital está creciendo a pasos agigantados...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Articulo
