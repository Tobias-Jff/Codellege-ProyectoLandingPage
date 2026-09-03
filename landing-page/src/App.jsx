import './App.css'
import Noticias from './Noticias'
import SobreN from './components/SobreN';
import Header from './Header'
import Ceo from './components/ceo';

function App() {
  return (
    <>
      
      {/*HEADER*/}
      <Header/>

      {/*NOTICIAS*/}
      <Noticias/>
      <SobreN />

      {/*CEO*/}
      <Ceo/>
    </>
  )
}

export default App
