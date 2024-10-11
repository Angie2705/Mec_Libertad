import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Inicio from '../components/Inicio'
import Nosotros from '../components/Nosotros'
import Servicios from '../components/Servicios'
import Contacto from '../components/Contacto'
import Whatsapp from '../components/Whatsapp'
import Productos from '../components/Productos'

const Home = () => {
  return (
    <> 
      <Header />
      <Sidebar/>
      <div className='md:pt-16'>
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