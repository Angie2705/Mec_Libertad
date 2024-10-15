import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Producto from './pages/Producto'
import Loginad from './pages/Loginad'
import Agregarprod from './pages/Agregarprod'
import Read from './components/Read'
import Update from './components/Update'
import UpdateWrite from './components/UpdateWrite'
import FichaProducto from './components/FichaProducto'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/loginad' element={<Loginad/>}></Route>
        <Route path='/producto' element={<Producto/>}></Route>
        <Route path='/agregarprod' element={<Agregarprod/>}></Route>
        <Route path='/read' element={<Read/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
        <Route path='/updatewrite/:fireBaseId' element={<UpdateWrite/>} ></Route>
        <Route path='/producto/:fireBaseId' element={<FichaProducto/>}/>
      </Routes>
    </>
    
    


  )
}

export default App
