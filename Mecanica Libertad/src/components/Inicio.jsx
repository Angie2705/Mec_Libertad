import React from 'react';
import { assets } from '../assets/assets';

function Inicio() {

  
  return (
    <div className='mx-3'>
      <section id="inicio" className={`relative overflow-hidden flex flex-col justify-between text-center rounded-lg
        bg-contain
        md:bg-contain 
        lg:bg-cover lg:bg-center
        xl:bg-cover
        2xl:bg-cover 2xl:-
        bg-no-repeat
        h-screen
        sm:h-[95vh]`
        } style={{backgroundImage:`url(${assets.Mecanica1})`}}>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 sm:mt-8 md:mt-16"></h1>
        
        {/* Botón en la parte inferior */}
          <div className="mb-8">
            <button className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700">Descubre Más
            </button>
          </div>

          

      
        
      </section>
    </div>
    /*
    relative h-auto sm:h-screen bg-no-repeat bg-cover bg-center sm:bg-cover md:bg-contain lg:bg-cover overflow-hidden flex flex-col justify-between text-center
    
    relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center

    relative bg-center bg-black  lg:bg-cover h-screen bg-no-repeat flex items-center justify-center overflow-hidden flex flex-col justify-between text-center

    bg-cover 
        md:bg-contain 
        lg:bg-cover lg:bg-center
        xl:bg-cover
        2xl:bg-cover 2xl:-
        bg-no-repeat
        h-screen rounded-lg
    */
  );
}

export default Inicio;