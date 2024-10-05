import React from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'
const ProductItem = ({id, image, name, price, desc}) => {
  return (
    <Link to={`/product/${id}`}>
        
          <div key={id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div className='w-full h-80'>
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-fit"
            />
            </div>
            
            <div className="p-4">
              <h3 className="text-xl text-gray-900">{name}</h3>
              <p className="text-lg text-gray-600 mt-1">{desc}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-md font-bold text-red-700">Precio Aproximado: ${price}</span>
              </div>
            </div>
          </div>

    </Link>
    
  )
}

export default ProductItem