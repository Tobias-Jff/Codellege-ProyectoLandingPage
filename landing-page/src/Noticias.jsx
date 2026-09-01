import { useState } from 'react'
import './Noticias.css'
import newsArticles from './data/newsData'

function Noticias() {
  const [selectedArticle, setSelectedArticle] = useState(newsArticles[0])

  const handleSelectArticle = (article) => {
    setSelectedArticle(article)
    const detailSection = document.getElementById('noticia-detalle')
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="noticias-page">
      <section className="noticias-section" aria-labelledby="news-heading">
        <header className="noticias-header">
          <h2 id="news-heading">EN LAS NOTICIAS</h2>
        </header>

        <div className="noticias-grid" role="list" aria-label="Noticias de tecnología innovadora">
          {newsArticles.map((article) => (
            <article key={article.id} className="noticia-card" role="listitem">
              <div className="noticia-meta">
                <span>{article.date}</span>
                <span className="noticia-category">{article.category}</span>
                <button
                  type="button"
                  className="noticia-plus"
                  aria-label={`Abrir noticia ${article.title}`}
                  onClick={() => handleSelectArticle(article)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="noticia-title-link"
                onClick={() => handleSelectArticle(article)}
              >
                <h3>{article.title}</h3>
              </button>

              <div className="noticia-image-wrap">
                <img src={article.image} alt={article.title} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="noticia-feature" id="noticia-detalle" aria-live="polite">
        <div className="noticia-feature-copy">
          <p className="noticia-kicker">NOTICIA DESTACADA</p>
          <h3>{selectedArticle.title}</h3>
          <p>{selectedArticle.summary}</p>
          <div className="noticia-feature-meta">
            <span>{selectedArticle.date}</span>
            <span>{selectedArticle.category}</span>
          </div>
        </div>

        <div className="noticia-feature-visual">
          <img src={selectedArticle.image} alt={selectedArticle.title} />
        </div>
      </section>

      <section className="noticia-detail">
        <div className="noticia-detail__content">
          <p>{selectedArticle.details}</p>
        </div>
      </section>
    </main>
  )
}

export default Noticias
