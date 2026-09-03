import './App.css'
import Noticias from './Noticias'
import SobreN from './components/SobreN';
import Ceo from './components/Ceo';
import Header from './Header'

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
