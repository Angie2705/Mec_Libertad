import React from 'react'
import Header from '../components/Header'
import ProductItem from '../components/ProductItem'
import Productos from '../components/Productos'

const Producto = ({admin}) => {
  return (
    <>
    <Header user={admin}/>
    <div className='md:pt-20'>
      <Productos admin={admin}/>
    </div>
    
    </>
  )
}

export default Producto