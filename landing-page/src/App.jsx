import './App.css'
import Noticias from './components/Noticias'
import Header from './components/Header'
import Hero from './components/Hero'
import SobreN from './components/SobreN'
import Ceo from './components/ceo.jsx'
import Footer from './Footer'
import Sponsors from './components/Sponsors'

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
      
      <Ceo />
      
      {/*NOTICIAS*/}
      <Noticias/>

      <Footer />

    </>
  )
}

export default App
