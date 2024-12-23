import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Producto from './pages/Producto'
import Loginad from './pages/Loginad'
import Agregarprod from './pages/Agregarprod'
import Read from './components/Read'
import Update from './components/Update'
import UpdateWrite from './components/UpdateWrite'
import FichaProducto from './components/FichaProducto'
import TablaAdmin from './components/TablaAdmin'

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'
import { useState } from 'react'
import PrivateRoute from './components/privateRoute'
import FichaProductoAdmin from './components/FichaProductoAdmin'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cotizacion from './components/Cotizacion'

function App() {
  
  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (userFireBase) => {
    if (userFireBase) {
      setUser(userFireBase)
    } else{
      setUser(null)
    }
  })

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/loginad' element={<Loginad admin={user}/> } ></Route>
        <Route path='/tablaadmin' element={<PrivateRoute><TablaAdmin admin={user}/></PrivateRoute>}></Route>
        <Route path='/agregarprod' element={<PrivateRoute><Agregarprod/></PrivateRoute>}></Route>
        <Route path='/producto' element={<Producto admin={user}/>}></Route>
        <Route path='/read' element={<Read/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
        <Route path='/updatewrite/:fireBaseId' element={<UpdateWrite/>} ></Route>
        <Route path='/producto/:fireBaseId' element={<FichaProducto admin={user}/>}/>
        <Route path='/productoAdmin/:fireBaseId' element={<FichaProductoAdmin admin={user}/>}/>
        <Route path='/cotizacion' element={<Cotizacion admin={user}/>}></Route>
      </Routes>
    </>
  )
}

export default App
