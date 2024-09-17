import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Producto from './pages/Producto'
import Write from './components/Write'
import Read from './components/Read'
import Update from './components/Update'
import UpdateWrite from './components/UpdateWrite'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/producto' element={<Producto/>}></Route>
        <Route path='/write' element={<Write/>}></Route>
        <Route path='/read' element={<Read/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
        <Route path='/updatewrite/:fireBaseId' element={<UpdateWrite/>} ></Route>

      </Routes>
    </>
    
    


  )
}

export default App
