import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/SideBar'
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
      <main className=''>
        <Inicio />
        <Nosotros />
        <Servicios />
        <Productos />
        <Contacto />
        
      </main>

      <Whatsapp/>
    </>
  )
}

export default Home