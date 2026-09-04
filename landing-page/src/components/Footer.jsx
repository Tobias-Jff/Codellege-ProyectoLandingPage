import { useState } from 'react'
import '../styles/Footer.css'

const infoPanels = {
  privacidad: {
    label: 'Privacidad',
    title: 'Política de privacidad',
    description: 'Protegemos la información que compartes con EGCO y la utilizamos únicamente para ofrecerte nuestros servicios y mejorar tu experiencia.',
  },
  terminos: {
    label: 'Términos',
    title: 'Términos de uso',
    description: 'El contenido de este sitio es informativo. Al utilizarlo, aceptas hacerlo de forma responsable y respetando las condiciones de nuestros servicios.',
  },
  cookies: {
    label: 'Cookies',
    title: 'Política de cookies',
    description: 'Utilizamos cookies esenciales para que el sitio funcione correctamente y para comprender cómo se utiliza nuestra página.',
  },
}

function Footer() {
  const [activePanel, setActivePanel] = useState(null)
  const activeContent = activePanel ? infoPanels[activePanel] : null

  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault()

    const target = document.getElementById(targetId)
    if (!target) return

    const startPosition = window.scrollY
    const targetPosition = Math.max(0, startPosition + target.getBoundingClientRect().top - 80)
    const distance = targetPosition - startPosition
    const duration = 1400
    let startTime

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime

      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easedProgress = progress < 0.5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2

      window.scrollTo(0, startPosition + distance * easedProgress)

      if (progress < 1) requestAnimationFrame(animateScroll)
    }

    requestAnimationFrame(animateScroll)
  }

  const togglePanel = (panel) => {
    setActivePanel((currentPanel) => currentPanel === panel ? null : panel)
  }

  return (
    <footer id="footer"className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-mark">EGCO</span>
          <p>Transformamos ideas complejas en sistemas digitales<br />de alto impacto para negocios y marcas que quieren<br />liderar la próxima era tecnológica.</p>
        </div>

        <div className="footer-column">
          <span className="footer-column-title">EXPLORAR</span>
          <a href="#inicio" onClick={(event) => handleSmoothScroll(event, 'inicio')}>Inicio</a>
          <a href="#noticias">Servicio</a>
          <a href="#noticias">Portafolio</a>
        </div>

        <div className="footer-column">
          <span className="footer-column-title">EMPRESA</span>
          <a href="#sobre-nosotros" onClick={(event) => handleSmoothScroll(event, 'sobre-nosotros')}>Sobre nosotros</a>
        </div>

        <nav className="footer-column footer-legal" aria-label="Información legal">
          <span className="footer-column-title">LEGAL</span>
          {Object.entries(infoPanels).map(([key, panel]) => (
            <button
              key={key}
              type="button"
              className={`footer-nav-button ${activePanel === key ? 'is-active' : ''}`}
              onClick={() => togglePanel(key)}
              aria-expanded={activePanel === key}
            >
              {panel.label}
            </button>
          ))}
        </nav>
      </div>

      {activeContent && (
        <div className="info-panels" aria-live="polite">
          <section className="info-panel">
            <h5>{activeContent.title}</h5>
            <p>{activeContent.description}</p>
          </section>
        </div>
      )}

      <div className="footer-bottom">
        <span>© 2026 EGCO. Todos los derechos reservados.</span>
        <div className="footer-socials">
          <a href="#linkedin">LinkedIn</a>
          <a href="#instagram">Instagram</a>
          <a href="#x">X</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
