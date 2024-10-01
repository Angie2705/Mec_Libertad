import React from 'react';
import { assets } from '../assets/assets';

function Inicio() {

  
  return (
    
    <div className=' my-6 mx-5 md:mx-10 flex justify-center items-end'>
      <img className="rounded-lg" src={assets.Mecanica1} alt="" />
      <button className="px-2 md:px-4 py-1 md:py-2 mb-3 md:mb-6 text-sm md:text-base rounded-full bg-red-600 text-white hover:bg-red-700 absolute "> Descubre Más</button>
    </div>
    
  );
}

export default Inicio;