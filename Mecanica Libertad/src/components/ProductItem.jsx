import React from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'
const ProductItem = ({id, image, name, price, desc}) => {
  return (
    <Link to={`/product/${id}`}>
        <div className='flex flex-col items-center hover:scale-105 hover:outline hover:outline-4 hover:outline-red-500 transition duration-1000 cursor-pointer'>
                    <div>
                        <img className="w-80 h-80 object-fill rounded-sm " src={image} alt="" />
                    </div>
                    <div className='bg-gray-200 w-80 lg:w-full'>
                    <p className=''>{name}</p>
                    <p>Precio aproximado: {price}</p></div>
                    <p>{desc}</p>
                    

        </div>
    </Link>
    
  )
}

export default ProductItem