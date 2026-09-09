import { useEffect, useState } from 'react'
import '../styles/Noticias.css'
import newsArticles from '../data/newsData'

function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(newsArticles.length)
  const [flippedCards, setFlippedCards] = useState([])
  const [visibleCards, setVisibleCards] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [loadedImages, setLoadedImages] = useState({}) // Estado para saber qué imágenes cargaron
  const carouselArticles = [...newsArticles, ...newsArticles, ...newsArticles]

  const isAnyCardFlipped = flippedCards.length > 0

  useEffect(() => {
    const updateVisibleCards = () => {
      const nextVisibleCards = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3
      setVisibleCards(nextVisibleCards)
      setIsTransitioning(false)
      setCurrentIndex(newsArticles.length)
      requestAnimationFrame(() => setIsTransitioning(true))
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [])

  useEffect(() => {
    if (isAnyCardFlipped) return undefined

    const autoplay = window.setInterval(() => {
      setCurrentIndex((current) => current + 1)
    }, 4000)

    return () => window.clearInterval(autoplay)
  }, [visibleCards, isAnyCardFlipped])

  const toggleCard = (articleId) => {
    setFlippedCards((current) => current.includes(articleId)
      ? current.filter((id) => id !== articleId)
      : [...current, articleId])
  }

  const handleImageLoad = (key) => {
    setLoadedImages((prev) => ({ ...prev, [key]: true }))
  }

  const goToPrevious = () => {
    setCurrentIndex((current) => {
      const previous = current - 1
      return previous <= 0 ? newsArticles.length : previous
    })
  }

  const goToNext = () => {
    setCurrentIndex((current) => {
      const next = current + 1
      if (next >= newsArticles.length * 2) {
        return newsArticles.length
      }
      return next
    })
  }

  const handleTrackTransitionEnd = () => {
    if (currentIndex < newsArticles.length * 2) return

    setIsTransitioning(false)
    setCurrentIndex(newsArticles.length)
    requestAnimationFrame(() => setIsTransitioning(true))
  }

  return (
    <main className="noticias-page mx-auto w-full max-w-6xl px-5 py-20 text-white">
      <section id="noticias" className="noticias-section" aria-labelledby="news-heading">
        
        {/* CARRUSEL DE NOTICIAS */}
        <div className="noticias-carousel-wrap relative" role="region" aria-label="News carousel">
          <button type="button" onClick={goToPrevious} aria-label="Previous news" className="noticias-carousel-control isolate absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border-0 bg-transparent text-2xl leading-none before:blur-2xl transition"><span className="relative z-10">&#8249;</span></button>
          
          <div className="noticias-carousel min-w-0 overflow-hidden">
            <div className="noticias-track flex" onTransitionEnd={handleTrackTransitionEnd} style={{ '--visible-cards': visibleCards, transition: isTransitioning ? undefined : 'none', transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}>
              {carouselArticles.map((article, articleIndex) => {
                const isFlipped = flippedCards.includes(article.id)
                const imageKey = `${article.id}-${articleIndex}`
                const isImageLoaded = loadedImages[imageKey]

                return (
                  <article key={imageKey} className="noticia-slide shrink-0 px-1" role="listitem">
                    <div className={`noticia-card ${isFlipped ? 'is-flipped' : ''}`} onClick={() => toggleCard(article.id)}>
                      <div className="noticia-card-inner">
                        <div className="noticia-card-face flex flex-col rounded-lg border border-white/15 bg-white/[0.06] text-left shadow-2xl">
                          <div className="noticia-meta flex items-center justify-between gap-3 px-5 text-xs text-white/60">
                            <span className="font-zalando-sans-expanded">{article.date}</span>
                            <span className="font-zalando-sans-expanded uppercase tracking-wider">{article.category}</span>
                            <span className="font-zalando-sans-expanded text-teal-200">{article.language || 'ES'}</span>
                          </div>
                          <h3 className="noticia-title mt-5 px-5 font-zalando-sans-semi-expanded text-xl font-bold leading-tight">{article.title}</h3>
                          <hr className="noticia-divider mx-5 my-4 border-white/20" />
                          <div className="noticia-image-wrap relative overflow-hidden bg-black/20">
                            
                            {/* SPINNER DE CARGA */}
                            {!isImageLoaded && (
                              <div className="image-loader-container">
                                <div className="image-spinner" />
                              </div>
                            )}

                            <img
                              className={`h-full w-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                              src={article.image}
                              alt={article.title}
                              loading="lazy"
                              onLoad={() => handleImageLoad(imageKey)}
                            />
                          </div>
                        </div>
                        <div className="noticia-card-face noticia-card-back flex flex-col rounded-lg bg-white text-left text-slate-950">
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{article.category} / {article.date}</span>
                          <h3 className="mt-3 text-xl font-bold leading-tight">{article.title}</h3>
                          <p className="mt-4 text-sm leading-relaxed text-slate-700">{article.summary}</p>
                          <ul className="mt-4 space-y-2 text-sm text-slate-700">
                            {(article.details?.keyPoints || []).slice(0, 3).map((point) => <li key={point} className="border-l-2 border-teal-500 pl-3">{point}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <button type="button" onClick={goToNext} aria-label="Next news" className="noticias-carousel-control isolate absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border-0 bg-transparent text-2xl leading-none before:blur-2xl transition"><span className="relative z-10">&#8250;</span></button>
        </div>

        {/* PIE DE SECCIÓN */}
        <footer className="noticias-footer mt-8 border-t border-white/15 pt-6 flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <div className="noticias-header-title font-zalando-sans-expanded font-bold text-left">
              <h2 id="news-heading" className="text-2xl tracking-wider uppercase m-0">NEWS</h2>
            </div>
            
            <div className="noticias-indicators flex items-center justify-center gap-2 mx-auto" aria-label="News position">
              {newsArticles.map((article, articleIndex) => {
                const isActive = articleIndex === ((currentIndex - newsArticles.length) % newsArticles.length + newsArticles.length) % newsArticles.length;
                
                return (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => setCurrentIndex(newsArticles.length + articleIndex)}
                    aria-label={`Go to news ${articleIndex + 1}`}
                    className={`noticias-indicator relative h-2.5 rounded-full overflow-hidden transition-all ${isActive ? 'is-active' : ''}`}
                  >
                    {isActive && <span className="noticias-progress-bar" style={{ animationPlayState: isAnyCardFlipped ? 'paused' : 'running' }} />}
                  </button>
                );
              })}
            </div>
          </div>
        </footer>

      </section>
    </main>
  )
}

export default Noticias