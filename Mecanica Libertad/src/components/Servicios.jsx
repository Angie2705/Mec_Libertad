import React, { useState } from 'react';
import Title from './Title';
import { assets } from '../assets/assets';
import ImagenServicios from './ImagenServicios';
import { servicesList } from '../assets/infoServicios';

function Servicios() {

  const titulo1 = "Servicio1"
  const descripcion1 = "Descripcion1"

  return (
    <section id="servicios" className="h-cover items-center justify-center text-center pb-5 mt-10 ">
      <div>

      <div className='text-center font-semibold text-3xl mb-4'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className=' text-gray-600'>Nuestros <span className=' text-red-700'>Servicios</span></p>
          <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-red-700'></p>
        </div>
      </div>

        <div className='hidden lg:grid grid-cols-3 gap-1 pt-2'>
          <div className='grid grid-rows-2 gap-1'>
            <ImagenServicios img={assets.Mecanica1} titulo={servicesList.service1.nombre} descripcion={servicesList.service1.descripcion}/>
            <ImagenServicios img={assets.Mecanica2} titulo={servicesList.service2.nombre} descripcion={servicesList.service2.descripcion}/>
          </div>

          <div className='grid grid-rows-3 gap-1'>
            <ImagenServicios img={assets.Mecanica3} titulo={servicesList.service3.nombre} descripcion={servicesList.service3.descripcion}/>
            <ImagenServicios img={assets.Mecanica4}/>
            <ImagenServicios img={assets.Mecanica5}/>
          </div>

          <div className='grid grid-rows-3 gap-1'>
            <ImagenServicios img={assets.Mecanica6}/>
            <ImagenServicios img={assets.Mecanica7}/>
            <ImagenServicios img={assets.Mecanica1}/>
          </div>
        </div>

        <div className='lg:hidden grid grid-cols-2 gap-1 pt-2'>
          <div className='grid grid-rows-3 gap-1  '>
            <ImagenServicios img={assets.Mecanica2} />
            <ImagenServicios img={assets.Mecanica2} />
            <ImagenServicios img={assets.Mecanica2} />
          </div>

          <div className='grid grid-rows-5 gap-1'>
            <ImagenServicios img={assets.Mecanica2} />
            <ImagenServicios img={assets.Mecanica3} />
            <ImagenServicios img={assets.Mecanica4} />
            <ImagenServicios img={assets.Mecanica3} />
            <ImagenServicios img={assets.Mecanica4} />
          </div>
        </div>

      </div>
    </section>
  );
}

{/*
  
                <figure className="relative transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 cursor-pointer hover:scale-105 transition hover:outline hover:outline-4 rounded-lg hover:outline-white duration-300">
                <a href="#">
                  <img className="rounded-lg" src={assets.Mecanica3} alt="image description"/>
                </a>
                <figcaption className="absolute px-4 text-lg text-white bottom-6">
                    <p>Do you want to get notified when a new component is added to Flowbite?</p>
                </figcaption>
              </figure>


              <img className="hover:scale-105 transition  hover:outline hover:outline-8 duration-300 cursor-pointer hover:outline-white h-full w-full rounded-sm hover:z-10" src={assets.Mecanica5} alt="" />
          
              <img className="hover:scale-105 transition  hover:outline hover:outline-8 duration-300 cursor-pointer hover:outline-white h-full w-full rounded-sm hover:z-10" src={assets.Mecanica7} alt="" />
  */}

export default Servicios;

/*<div className="relative text-center w-1/2 mx-auto py-2 bg-gradient-to-r from-red-500 to-gray-800 rounded-lg shadow-lg">
          <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-md">
            Nuestros servicios
          </h1>
          <div className="absolute inset-0 bg-opacity-50 bg-black rounded-lg hover:bg-opacity-0 transition duration-500"></div>
        </div>
*/