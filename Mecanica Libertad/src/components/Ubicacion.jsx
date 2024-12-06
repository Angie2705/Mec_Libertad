import React, { useState } from 'react';

function Contacto() {
  //Variables con los links a Google Maps.
  let direc1 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.1909261627734!2d-70.6781775890592!3d-33.39218277330176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c68ec9598175%3A0x9cd4c0fdc4dcc4a3!2sTeniente%20Mery%201962%2C%208551032%20Santiago%2C%20Conchal%C3%AD%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1728589845504!5m2!1ses-419!2scl"
  let direc2 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1087.5901932276338!2d-70.39289408084011!3d-23.525208001864268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96ae298429fc0001%3A0x60515cb052155f8c!2sCalle%209%20425%2C%20galp%C3%B3n%2012-A%2C%20Antofagasta!5e0!3m2!1ses-419!2scl!4v1728596434106!5m2!1ses-419!2scl"

  const [direction, setDirection] = useState(direc1)
  // Se establece la variable que debe activar al presionar cada boton.
  const di1 = () => {
    setDirection(direc1)
  }

  const di2 = () => {
    setDirection(direc2)
  }

  return (
    <div className="rounded-lg p-6 bg-white w-full">
      <h2 className="text-black text-center text-2xl font-semibold mb-5">Ubicación</h2>
      {/*Botón de direct1*/}
      <button onClick={() => di1()} id="dr1" className='bg-gray-600 text-white text-sm focus:outline-none 
        focus:ring focus:ring-red-600 w-full h-10 mb-2 rounded-lg'>Teniente Mery #1962, Conchalí Santiago de Chile.</button>
      {/*Botón de direct2*/}
      <button onClick={() => di2()} id="dr2" className='bg-gray-600 text-white text-sm focus:outline-none 
        focus:ring focus:ring-red-600 w-full h-10 mb-2 rounded-lg'>SIGMA S.A - Calle 9 425, interior 12, Antofagasta</button>
      {/*Mapa de Google Maps*/}
      <iframe src={`${direction}`} className="w-full h-96 mt-4 border-4 shadow-lg" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

export default Contacto;

