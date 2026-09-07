import './App.css'
import Noticias from './components/Noticias'
import Header from './components/Header'
import Hero from './components/Hero'
import SobreN from './components/SobreN'
import Ceo from './components/ceo.jsx'
import Footer from './components/Footer'
import Sponsors from './components/Sponsors'
import Mapa  from './components/mapa.jsx'

function App() {
  return (
    <>
      
      {/*HEADER*/}
      <Header/>

      {/*HERO*/}
      <Hero />

      {/*SPONSORS*/}
      <Sponsors/>

      <SobreN />

      <Mapa />
      
      <Noticias/>

      <Ceo />

      <Footer />

    </>
  )
}

export default App
