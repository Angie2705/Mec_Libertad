import React from 'react'
import Header from '../components/Header'
import ProductItem from '../components/ProductItem'
import Productos from '../components/Productos'

const Producto = () => {
  return (
    <>
    <Header/>
    <div className='md:pt-20'>
      <Productos/>
    </div>
    
    </>
  )
}

export default Producto