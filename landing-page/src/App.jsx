import './App.css'
import Noticias from './components/Noticias'
import Header from './components/Header'
import SobreN from './components/SobreN'
import Ceo from './components/Ceo'
import Footer from './Footer'

function App() {
  return (
    <>
      
      {/*HEADER*/}
      <div id="inicio">
        <Header/>
      </div>

      {/*NOTICIAS*/}
      <Noticias/>
      <SobreN />
      <Ceo />
      <Footer />
    </>
  )
}

export default App
