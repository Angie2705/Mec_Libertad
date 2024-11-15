import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Producto from './pages/Producto'
import Loginad from './pages/Loginad'
import Agregarprod from './pages/Agregarprod'
import Read from './components/Read'
import Update from './components/Update'
import UpdateWrite from './components/UpdateWrite'
import FichaProducto from './components/FichaProducto'
import TablaAdmin from './components/TablaAdmin'
import adminPage from './components/adminPage'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, auth } from './firebase'
import { useState } from 'react'
import PrivateRoute from './components/privateRoute'
import ChatWidget from './components/Chat'

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
      {/* {user ? <adminPage useremail = {user.email}/> : <Loginad/>} */}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/loginad' element={<Loginad/>}></Route>
        <Route path='/tablaadmin' element={<PrivateRoute><TablaAdmin admin={user}/></PrivateRoute>}></Route>
        <Route path='/agregarprod' element={<PrivateRoute><Agregarprod/></PrivateRoute>}></Route>
        <Route path='/producto' element={<Producto admin={user}/>}></Route>
        <Route path='/read' element={<Read/>}></Route>
        <Route path='/update' element={<Update/>}></Route>
        <Route path='/updatewrite/:fireBaseId' element={<UpdateWrite/>} ></Route>
        <Route path='/producto/:fireBaseId' element={<FichaProducto admin={user}/>}/>
      </Routes>
      <ChatWidget/>


    </>
    
    


  )
}

export default App
