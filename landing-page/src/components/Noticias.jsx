import { useEffect, useState } from 'react'
import '../styles/Noticias.css'
import newsArticles from '../data/newsData'

function Noticias() {
  const [currentIndex, setCurrentIndex] = useState(newsArticles.length)
  const [flippedCards, setFlippedCards] = useState([])
  const [visibleCards, setVisibleCards] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const carouselArticles = [...newsArticles, ...newsArticles, ...newsArticles]

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
    if (flippedCards.length > 0) return undefined

    const autoplay = window.setInterval(() => {
      setCurrentIndex((current) => current + 1)
    }, 4000)

    return () => window.clearInterval(autoplay)
  }, [visibleCards, flippedCards.length])

  const toggleCard = (articleId) => {
    setFlippedCards((current) => current.includes(articleId)
      ? current.filter((id) => id !== articleId)
      : [...current, articleId])
  }

  const goToPrevious = () => {
    setCurrentIndex((current) => current - 1)
  }
  const goToNext = () => {
    setCurrentIndex((current) => current + 1)
  }

  const handleTrackTransitionEnd = () => {
    if (currentIndex < newsArticles.length * 2) return

    setIsTransitioning(false)
    setCurrentIndex(newsArticles.length)
    requestAnimationFrame(() => setIsTransitioning(true))
  }

  // Tailwind: layout, spacing, colors, responsive classes and card structure.
  return (
    <main className="noticias-page mx-auto w-full max-w-6xl px-5 py-20 text-white">
      <section id="noticias" className="noticias-section" aria-labelledby="news-heading">
        <header className="noticias-header mb-8 border-b border-white/15 pb-5">
          <div className="noticias-header-title font-zalando-sans-expanded font-bold">
            <h2 id="news-heading">NEWS</h2>
          </div>
        </header>

        <div className="noticias-carousel-wrap relative" role="region" aria-label="News carousel">
          <button type="button" onClick={goToPrevious} aria-label="Previous news" className="noticias-carousel-control isolate absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border-0 bg-transparent text-2xl leading-none before:blur-2xl transition"><span className="relative z-10">&#8249;</span></button>
          <div className="noticias-carousel min-w-0 overflow-hidden">
          <div className="noticias-track flex" onTransitionEnd={handleTrackTransitionEnd} style={{ '--visible-cards': visibleCards, transition: isTransitioning ? undefined : 'none', transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}>
            {carouselArticles.map((article, articleIndex) => {
              const isFlipped = flippedCards.includes(article.id)

              return (
                <article key={`${article.id}-${articleIndex}`} className="noticia-slide shrink-0 px-1" role="listitem">
                  <div className={`noticia-card ${isFlipped ? 'is-flipped' : ''}`} onClick={() => toggleCard(article.id)}>
                    <div className="noticia-card-inner">
                      <div className="noticia-card-face flex flex-col rounded-lg border border-white/15 bg-white/[0.06] p-5 text-left shadow-2xl">
                        <div className="noticia-meta flex items-center justify-between gap-3 text-xs text-white/60">
                          <span className="font-zalando-sans-expanded">{article.date}</span>
                          <span className="font-zalando-sans-expanded uppercase tracking-wider">{article.category}</span>
                          <span className="font-zalando-sans-expanded text-teal-200">{article.language || 'ES'}</span>
                        </div>
                        <h3 className="noticia-title mt-5 font-zalando-sans-semi-expanded text-xl font-bold leading-tight">{article.title}</h3>
                        <hr className="noticia-divider my-4 border-white/20" />
                        <div className="noticia-image-wrap h-48 overflow-hidden rounded bg-black/20">
                          <img className="h-full w-full object-cover" src={article.image} alt={article.title} loading="lazy" />
                        </div>
                        <button type="button" onClick={(event) => { event.stopPropagation(); toggleCard(article.id) }} className="read-story-button mt-4 self-start text-xs uppercase tracking-[0.18em] text-teal-200 transition hover:text-white">Read story +</button>
                      </div>
                      <div className="noticia-card-face noticia-card-back flex flex-col rounded-lg bg-white p-6 text-left text-slate-950">
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
        <div className="noticias-indicators mt-5 flex justify-center gap-2" aria-label="News position">
          {newsArticles.map((article, articleIndex) => (
            <button
              key={article.id}
              type="button"
              onClick={() => setCurrentIndex(newsArticles.length + articleIndex)}
              aria-label={`Go to news ${articleIndex + 1}`}
              className={`noticias-indicator h-2 w-2 rounded-full transition-all ${articleIndex === ((currentIndex - newsArticles.length) % newsArticles.length + newsArticles.length) % newsArticles.length ? 'is-active' : ''}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Noticias