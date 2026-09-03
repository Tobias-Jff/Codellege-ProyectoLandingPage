import { useState, useMemo, useEffect, useRef } from 'react'
import '../styles/Noticias.css'
import newsArticles from '../data/newsData'

function Noticias() {
  const [selectedArticle, setSelectedArticle] = useState(newsArticles[0])
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [favorites, setFavorites] = useState([])
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('news_favorites') || '[]')
    setFavorites(saved)
  }, [])

  const toggleFavorite = (e, articleId) => {
    e.stopPropagation()
    let updated
    if (favorites.includes(articleId)) {
      updated = favorites.filter((id) => id !== articleId)
    } else {
      updated = [...favorites, articleId]
    }
    setFavorites(updated)
    localStorage.setItem('news_favorites', JSON.stringify(updated))
  }

  const categories = useMemo(() => {
    const unique = Array.from(new Set(newsArticles.map((item) => item.category)))
    return ['Todas', ...unique]
  }, [])

  const filteredArticles = useMemo(() => {
    return newsArticles.filter((article) => {
      const matchesCategory = activeCategory === 'Todas' || article.category === activeCategory
      const matchesFav = showOnlyFavorites ? favorites.includes(article.id) : true
      return matchesCategory && matchesFav
    })
  }, [activeCategory, showOnlyFavorites, favorites])

  const handleSelectArticle = (article) => {
    setSelectedArticle(article)
    const detailSection = document.getElementById('noticia-detalle')
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  /* Lógica para rastrear el movimiento del cursor sobre las tarjetas */
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <main className="noticias-page">
      <section id="noticias" className="noticias-section" aria-labelledby="news-heading">
        <header className="noticias-header">
          <div className="noticias-header-title">
            <h2 id="news-heading">EN LAS NOTICIAS</h2>
          </div>
          
          <nav className="noticias-categories" aria-label="Categorías de noticias">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-btn ${activeCategory === cat && !showOnlyFavorites ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat)
                  setShowOnlyFavorites(false)
                }}
              >
                {cat}
              </button>
            ))}

            <button
              type="button"
              className={`category-btn fav-filter-btn ${showOnlyFavorites ? 'active' : ''}`}
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            >
              Guardadas
            </button>
          </nav>
        </header>

        {filteredArticles.length === 0 ? (
          <p className="no-results">No hay noticias disponibles en esta categoría.</p>
        ) : (
          <div className="noticias-grid" role="list">
            {filteredArticles.map((article) => {
              const isSelected = selectedArticle.id === article.id
              const isFav = favorites.includes(article.id)

              return (
                <article 
                  key={article.id} 
                  className={`noticia-card ${isSelected ? 'is-selected' : ''}`}
                  role="listitem"
                  onClick={() => handleSelectArticle(article)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="noticia-card-glow" />
                  
                  <div className="noticia-meta">
                    <span className="noticia-date">{article.date}</span>
                    <span className="noticia-category">{article.category}</span>

                    <button
                      type="button"
                      className={`fav-star-btn ${isFav ? 'is-fav' : ''}`}
                      onClick={(e) => toggleFavorite(e, article.id)}
                      title={isFav ? "Quitar de guardadas" : "Guardar noticia"}
                    >
                      {isFav ? '★' : '☆'}
                    </button>
                  </div>

                  <div className="noticia-title-link">
                    <h3>{article.title}</h3>
                  </div>

                  <div className="noticia-image-wrap">
                    <img src={article.image} alt={article.title} loading="lazy" />
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* Sección Destacada */}
      <section className="noticia-feature" id="noticia-detalle" aria-live="polite">
        <div className="noticia-feature-copy">
          <p className="noticia-kicker">NOTICIA SELECCIONADA</p>
          <h3>{selectedArticle.title}</h3>
          <p className="noticia-summary-lead">{selectedArticle.summary}</p>
          
          <div className="noticia-feature-meta">
            <span>Publicado: {selectedArticle.date}</span>
            <span>Categoría: {selectedArticle.category}</span>
          </div>
        </div>

        <div className="noticia-feature-visual">
          <img src={selectedArticle.image} alt={selectedArticle.title} />
        </div>
      </section>

      {/* Lectura detallada */}
      <article className="noticia-detail">
        <div className="noticia-detail__content">
          {selectedArticle.details.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {selectedArticle.details.quote && (
            <blockquote className="noticia-quote">
              "{selectedArticle.details.quote}"
            </blockquote>
          )}

          {selectedArticle.details.keyPoints && (
            <ul className="noticia-bullet-list">
              {selectedArticle.details.keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </main>
  )
}

export default Noticias