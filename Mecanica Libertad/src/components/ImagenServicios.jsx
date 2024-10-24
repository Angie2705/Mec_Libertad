import React, { useState } from 'react'

const ImagenServicios = ({ img }) => {

  const [cardVisible, setCardVisible] = useState(false)

  const mostrarCard = () => setCardVisible(true)
  const cerrarCard = () => setCardVisible(false)
  
  return (
    <>
      <figure className="relative transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 hover:scale-105  
        hover:outline hover:outline-4 rounded-lg hover:outline-white hover:z-10 group">
        
        <a>
          <img
            className="w-full h-full filter blur-xs transition duration-500 ease-in-out group-hover:filter-none rounded-lg"
            src={img} alt="image description"/>
        </a>

        <figcaption className="absolute px-4 text-base md:text-lg text-white bottom-4 mt-4 flex flex-col items-center left-1/2 transform -translate-x-1/2">
          <p>Trabajos en plásticos técnicos.</p>
          <button onClick={mostrarCard} className="mt-2 bg-slate-500 hover:bg-slate-700 text-white font-bold text-sm py-2 px-4 rounded-full 
            opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">Ver más</button>
        </figcaption>

      </figure>

      {cardVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <button
              onClick={cerrarCard}
              className="absolute top-0 right-3 text-gray-600 hover:text-gray-800 text-3xl p">
              &times; 
            </button>
            <h2 className="text-lg font-semibold">Trabajos en plásticos técnicos</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea explicabo fugiat voluptate consequatur! Quasi sapiente quam explicabo unde facilis aspernatur velit, magnam culpa non a est ut consequuntur ducimus quis.</p>
            <button
              onClick={cerrarCard}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );

  
}

export default ImagenServicios;