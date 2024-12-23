import React from 'react'

const ProductItem = ({ id, image, name, price, desc, admin, navProduct }) => {

  return (

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
          <span className="text-md font-bold text-red-700">Precio Aproximado: ${price.toLocaleString()}</span>
        </div>

        {
          admin &&
          <button className='btn bg-black hover:bg-gray-500 rounded-xl text-white p-2' onClick={(e) => {
            e.stopPropagation();
            navProduct()
          }}> Actualizar Producto</button>
        }

      </div>
    </div>
  )
}

export default ProductItem