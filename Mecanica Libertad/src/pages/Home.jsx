import React, { useEffect, useState} from 'react'
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
      <div className=''>
        <main className='min-h-screen'>
          <Inicio />
          <Nosotros />
          <Servicios />
          <section id="contacto" className='text-center bg-gray-200 px-16 lg:px-16 pb-10 pt-8'>
            <div className='text-center font-semibold text-3xl mb-4'>
                <div className='inline-flex gap-2 items-center mb-3'>
                    <p className=' text-gray-600'>Nuestros <span className=' text-red-700'>Contactos</span></p>
                    <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-red-700'></p>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-x-10 gap-y-10 lg:gap-y-0'>
              <Email />
              <Ubicacion />
            </div>
          </section>
          <div className='bg-gray-800 h-28'>
          </div>
        </main>
      </div>
      <Whatsapp />

    </>
  )
}

export default Home
