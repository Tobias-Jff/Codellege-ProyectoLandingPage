import { useState, useMemo, useEffect, useRef } from 'react'
import '../styles/Noticias.css'
import newsArticles from '../data/newsData'

function Noticias() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [favorites, setFavorites] = useState([])
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const detailRef = useRef(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('news_favorites') || '[]')
    setFavorites(saved)
  }, [])

  useEffect(() => {
    if (!selectedArticle || !detailRef.current) return

    const detailSection = detailRef.current
    const startPosition = window.scrollY
    const targetPosition = Math.max(0, startPosition + detailSection.getBoundingClientRect().top - 140)
    const distance = targetPosition - startPosition
    const duration = 1400
    let animationFrame
    let startTime

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easedProgress = progress < 0.5
        ? 4 * progress ** 3
        : 1 - ((-2 * progress + 2) ** 3) / 2

      window.scrollTo(0, startPosition + distance * easedProgress)
      if (progress < 1) animationFrame = requestAnimationFrame(animateScroll)
    }

    animationFrame = requestAnimationFrame(animateScroll)
    return () => cancelAnimationFrame(animationFrame)
  }, [selectedArticle])

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
            
          </nav>
        </header>

        {filteredArticles.length === 0 ? (
          <p className="no-results">No hay noticias disponibles en esta categoría.</p>
        ) : (
          <div className="noticias-grid" role="list">
            {filteredArticles.map((article) => {
              const isSelected = selectedArticle && selectedArticle.id === article.id
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

        <>
     
        </>

    </main>
  )
}

export default Noticias