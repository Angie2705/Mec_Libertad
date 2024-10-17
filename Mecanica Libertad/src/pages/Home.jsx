import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Inicio from '../components/Inicio'
import Nosotros from '../components/Nosotros'
import Servicios from '../components/Servicios'
import Contacto from '../components/Contacto'
import Whatsapp from '../components/Whatsapp'
import Productos from '../components/Productos'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app, auth } from '../firebase'



const Home = () => {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth, (userFireBase) => {
      if (userFireBase) {
        setUser(userFireBase)
        console.log("home: "+ user)
      } else{
        setUser(null)
      }
    })
  })
  
  return (
    <> 
      <Header user={user}/>
      <Sidebar/>
      <div className='pt-16'>
        <main className='min-h-screen'>
          <Inicio />
          <Nosotros />
          <Servicios />
          <Contacto />
          
        </main>
      </div>
      <Whatsapp/>
    </>
  )
}

export default Home