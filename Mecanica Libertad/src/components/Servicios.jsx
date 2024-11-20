import React, { useState } from 'react';
import Title from './Title';
import { assets } from '../assets/assets';
import ImagenServicios from './ImagenServicios';
import { servicesList } from '../assets/infoServicios';

function Servicios() {

  const titulo1 = "Servicio1"
  const descripcion1 = "Descripcion1"

  return (
    <section id="servicios" className="h-fit  items-center justify-center text-center pb-5 mt-10 ">
      <div>

      {/* <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 text-center shadow-lg drop-shadow-md my-10">
  Nuestros Servicios
</h1> */}
{/* <h1 className="text-5xl md:text-6xl font-extrabold text-gray-500 text-center drop-shadow-md">
  <span className="text-red-500">Nuestros</span> Servicios
</h1> */}
{/* <h1 className="text-5xl md:text-6xl font-semibold text-center">
  <span className="text-red-500">Nuestros</span> <span className="text-gray-500">Servicios</span>
</h1> */}
<Title text1={"Nuestros"} text2={"Servicios"}/>


        <div className='h-full grid grid-cols-2 gap-1 pt-6'>
          <div className=' grid grid-rows-4 gap-1'>
            <ImagenServicios img={assets.Mecanica1} titulo={servicesList.service1.nombre} descripcion={servicesList.service1.descripcion}/>
            <ImagenServicios img={assets.Mecanica2} titulo={servicesList.service2.nombre} descripcion={servicesList.service2.descripcion}/>
            <ImagenServicios img={assets.Mecanica3} titulo={servicesList.service3.nombre} descripcion={servicesList.service3.descripcion}/>
            <ImagenServicios img={assets.Mecanica4} titulo={servicesList.service3.nombre} descripcion={servicesList.service3.descripcion}/>
          </div>

          <div className=' grid grid-rows-4 gap-1'>
          
            <ImagenServicios img={assets.Mecanica5} titulo={servicesList.service3.nombre} descripcion={servicesList.service3.descripcion}/>
            <ImagenServicios img={assets.Mecanica6} titulo={servicesList.service3.nombre} descripcion={servicesList.service3.descripcion}/>
            <ImagenServicios img={assets.Mecanica7} titulo={servicesList.service3.nombre} descripcion={servicesList.service3.descripcion}/>
            <ImagenServicios img={assets.Mecanica1} titulo={servicesList.service3.nombre} descripcion={servicesList.service3.descripcion}/>
          </div>
        </div>

        {/* <div className='lg:hidden grid grid-cols-2 gap-1 pt-2'>
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
        </div> */}

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