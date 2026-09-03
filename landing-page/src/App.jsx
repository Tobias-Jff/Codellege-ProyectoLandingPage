import './App.css'
import Noticias from './components/Noticias'
import SobreN from './components/SobreN';
import Ceo from './components/Ceo';
import Header from './Header'
import Header from './components/Header'

function App() {
  return (
    <>
      
      {/*HEADER*/}
      <Header/>

      {/*NOTICIAS*/}
      <Noticias/>
      <SobreN />
      <Ceo />
    </>
  )
}

export default App
