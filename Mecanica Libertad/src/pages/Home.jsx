import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Inicio from '../components/Inicio'
import Nosotros from '../components/Nosotros'
import Servicios from '../components/Servicios'

import Ubicacion from '../components/Ubicacion'
import Email from '../components/email'

import Whatsapp from '../components/Whatsapp'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app, auth } from '../firebase'



const Home = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (userFireBase) => {
      if (userFireBase) {
        setUser(userFireBase)
        console.log("home: " + user)
      } else {
        setUser(null)
      }
    })
  })

  return (
    <>
      <Header user={user} />
      <Sidebar />
      <div className='pt-16'>
        <main className='min-h-screen'>
          <Inicio />
          <Nosotros />
          <Servicios />
          <section id="contacto" className="text-center bg-gray-200 px-16 lg:px-16 pb-10 pt-5">
            <h2 className="w-full text-center text-4xl font-bold text-gray-800 p-6">Contáctanos</h2>
            <div className='flex flex-col lg:flex-row gap-x-10 gap-y-10 lg:gap-y-0'>
              <Email />
              <Ubicacion />
            </div>
          </section>
        </main>
      </div>
      <Whatsapp />
    </>
  )
}

export default Home