import React, { useState } from 'react'

const ImagenServicios = ({ img, titulo, descripcion }) => {

  const [cardVisible, setCardVisible] = useState(false)

  const mostrarCard = () => setCardVisible(true)
  const cerrarCard = () => setCardVisible(false)

  return (
    <>
      {/* Visualización del servicio */}
      <figure className="relative transition-all duration-300 cursor-pointer hover:scale-105  
        hover:outline hover:outline-4 rounded-lg hover:outline-white hover:z-10 group ">

        <a>
          <img
            className="h-[200px] w-full object-cover filter transition duration-500 ease-in-out group-hover:filter-none rounded-lg"
            src={img} alt="image description" />
        </a>

        <figcaption className="absolute text-base md:text-lg text-white bottom-4 mt-4 flex flex-col items-center left-1/2 transform -translate-x-1/2 ">
          <p className='font-medium text-lg md:text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:font-lg '>{titulo}</p>
          <button onClick={mostrarCard} className="mt-2 bg-slate-500 hover:bg-slate-700 text-white font-bold text-sm py-2 px-4 rounded-full 
            opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">Ver más</button>
        </figcaption>

      </figure>
      {/* Carta de presentación del servicio */}
      {cardVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative" >
            <button
              onClick={cerrarCard}
              className="absolute top-0 right-3 text-gray-600 hover:text-gray-800 text-3xl p">
              &times;
            </button>
            <h2 className="text-lg font-semibold pb-6">{titulo}</h2>
            <p className='text-justify'>{descripcion}</p>
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