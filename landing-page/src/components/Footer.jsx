import { useState } from 'react'
import '../styles/Footer.css'
import logo from '../assets/logo/logo-w.png'

const infoPanels = {
  privacidad: {
    label: 'Privacity',
    title: 'Privacy Policy',
    description: 'We protect the information you share with EGCO and use it only to provide you with our services and improve your experience.',
  },
  terminos: {
    label: 'Terms of use',
    title: 'Terms of use',
    description: 'The content of this site is for informational purposes only. By using it, you agree to do so responsibly and in accordance with the terms and conditions of our services.',
  },
  cookies: {
    label: 'Cookies',
    title: 'Cookies Policy',
    description: 'We use essential cookies to ensure the site functions correctly and to understand how our page is used.',
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
    <footer id="footer"className="site-footer font-dm-sans">
      <div className="footer-main">
        <div className="footer-brand">
          <img src={logo} alt="EGCO logo" className="h-[28px] mb-2" />
          <p>Future is happening.</p>
        </div>

        <div className="footer-column">
          <span className="footer-column-title">EXPLORAR</span>
          <a href="#inicio" onClick={(event) => handleSmoothScroll(event, 'inicio')}>Home</a>
          <a href="#noticias">News</a>
        </div>

        <div className="footer-column">
          <span className="footer-column-title">COMPANY</span>
          <a href="#sobre-nosotros" onClick={(event) => handleSmoothScroll(event, 'aboutUs')}>About Us</a>
        </div>

        <nav className="footer-column footer-legal" aria-label="Legal Information">
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
        <span>© 2026 EGCO. All rights reserved.</span>
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
