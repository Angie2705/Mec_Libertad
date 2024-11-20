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
import Footer from '../components/Footer'
import Title from '../components/Title'



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
      <div className='pt-16 bg-gray-100' >
        <main className='min-h-contain '>
          <Inicio />
          <Nosotros />
          <Servicios />
          <section id="contacto" className="text-center bg-gray-100 px-16 lg:px-12 pb-10 pt-5">
          <div className="flex flex-col items-start max-w-fit mx-auto my-4 pb-6">
  
            <h1 className="text-2xl md:text-5xl pl-4 font-sans font-bold border-l-4 border-red-700 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] dark:text-gray-300 relative tracking-[6px] text-gray-500">
                Contáctanos
                <div className="absolute right-0 top-full w-1/4 border-b-4 border-red-700 mt-1"></div>

            </h1>
          </div>
            <div className='flex flex-col lg:flex-row gap-x-10 gap-y-10 lg:gap-y-0'>
              <Email />
              <Ubicacion />
            </div>
          </section>
          <Footer/>

        </main>
      </div>
      <Whatsapp />
      

    </>
  )
}

export default Home