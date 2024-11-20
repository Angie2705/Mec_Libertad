import React from 'react';
import { assets } from '../assets/assets';
import Title from './Title';
function Nosotros() {
  return (
    <div className='md:py-10' id="nosotros">
      <Title text1="Sobre" text2="Nosotros"/>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-y-0 gap-y-8 p-2 bg-gray-100 pt-8 '>
        <div className="flex flex-col items-center justify-center rounded-lg py-5 mx-6 lg:ml-12 lg:mr-0 col-span-2 ">

          <p className="text-md text-zinc-950 px-6 word-space rounded-lg text-justify" style={{ wordSpacing: '8px' }}>
            Mecánica Libertad nace el año 2013 en la cuidad de Santiago de Chile, luego de que sus fundadores, Wilson Ocas Velásquez padre y Wilson Ocas Valverde, de profesión mecánico en máquinas y herramientas, tomaran la decisión de emprender, dedicando todo su tiempo y conocimientos técnicos adquiridos durante sus 11 años de vida laboral desarrollada tanto en Perú como en Chile en el área de la Metalmecánica.<br />
            Al comienzo la empresa contaba con sólo tres máquinas, operadas por su propio dueño y dos personas más, dándole solución a temas de mecanizado y estructuras, pero en pequeñas cantidades.<br />
            Debido a la gran calidad de sus trabajos, Mecánica Libertad adquirió cada vez más prestigio en la industria y por ende mayor cantidad de clientes, lo que derivó en un gran crecimiento en el corto plazo, adquiriendo maquinaria de última generación y especializada en la industria que permite la realización de los trabajos con una excelente calidad, precisión de las medidas y en los tiempos que nuestros clientes requieren.<br />
            Hoy en día nuestra empresa cuenta con colaboradores con sólidos conocimientos en las áreas que se desenvuelven, los cuales gracias a su esfuerzo y compromiso hacen de Mecánica Libertad una empresa dedicada a dar soluciones a la industria, destacando siempre la calidad, seriedad y compromiso de nuestros trabajos, lo que nos ha permitido trabajar con clientes de renombre.
            <br /><br />
            <span className='font-bold text-lg font-serif italic'>Nuestra Visión: </span>
            “Convertirnos en la mejor alternativa para la industria en ámbitos metalmecánicos”.
            <br /><br />
            <span className='font-bold text-lg font-serif italic'>Nuestra Misión: </span>
            "Desarrollar soluciones de calidad, innovadoras, rentables y que cumplan con todo lo que nuestos clientes necesiten. Establecer relaciones de confianza con nuestros clientes, las cuales sienten sus bases en la calidad de nuestros colaboradores y la buena comunicación".
          </p>
        </div>

        <div className="bg-gray-200 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-5 lg:gap-6 h-auto  rounded-lg p-6 pb-5 ml-6 mr-2 lg:ml-0 lg:mr-6">
          {/* <img className="w-full h-full object-cover rounded-lg hover:scale-95 transition duration-1000 cursor-pointer" src={assets.Mecanica2} alt="" />
          <img className="w-full h-full object-cover rounded-lg hover:scale-95 transition duration-1000 cursor-pointer" src={assets.Mecanica3} alt="" /> */}
          <img className="w-full h-full object-cover rounded-lg hover:scale-95 transition duration-1000 cursor-pointer" src={assets.Mecanica4} alt="" />
          <img className="w-full h-full object-cover rounded-lg hover:scale-95 transition duration-1000 cursor-pointer" src={assets.Mecanica5} alt="" />
        </div>
      </div>
    </div>
  );


  /*
  h-[85vh] flex items-center justify-center bg-gray-100 mt-3 text-center

  <h2 className="w-full text-center text-3xl font-bold text-gray-800 p-2 md:p-6">Sobre Nosotros</h2>
  
  */
}

export default Nosotros;