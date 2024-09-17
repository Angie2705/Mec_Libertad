import React from 'react';
import { assets } from '../assets/assets';
function Nosotros() {
  return (
    
    <section id="nosotros" className="bg-gray-100 mt-3 
    grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-y-0 gap-y-8 p-2 
    
   ">
      <div className="flex flex-col text-left items-center justify-center  rounded-lg max-w-full p-6 md:p-0" >
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Sobre Nosotros</h2>
        <p className="text-md text-gray-700 md:px-8 lg:px-16 word-space" style={{wordSpacing:'8px'}}>
        Mecánica Libertad nace el año 2013 en la cuidad de Santiago de Chile, luego de que sus fundadores, Wilson Ocas Velásquez padre y Wilson Ocas Valverde, de profesión mecánico en máquinas y herramientas, tomaran la decisión de emprender, dedicando todo su tiempo y conocimientos técnicos adquiridos durante sus 11 años de vida laboral desarrollada tanto en Perú como en Chile en el área de la Metalmecánica.<br/>
        Al comienzo la empresa contaba con sólo tres máquinas, operadas por su propio dueño y dos personas más, dándole solución a temas de mecanizado y estructuras, pero en pequeñas cantidades.<br/>
        Debido a la gran calidad de sus trabajos, Mecánica Libertad adquirió cada vez más prestigio en la industria y por ende mayor cantidad de clientes, lo que derivó en un gran crecimiento en el corto plazo, adquiriendo maquinaria de última generación y especializada en la industria que permite la realización de los trabajos con una excelente calidad, precisión de las medidas y en los tiempos que nuestros clientes requieren.<br/>
        Hoy en día nuestra empresa cuenta con colaboradores con sólidos conocimientos en las áreas que se desenvuelven, los cuales gracias a su esfuerzo y compromiso hacen de Mecánica Libertad una empresa dedicada a dar soluciones a la industria, destacando siempre la calidad, seriedad y compromiso de nuestros trabajos, lo que nos ha permitido trabajar con clientes de renombre.
        <br/><br/>
        <span className='font-bold text-base'>Nuestra Visión: </span>
         “Convertirnos en la mejor alternativa para la industria en ámbitos metalmecánicos”.
        <br/><br/>
        <span className='font-bold text-base'>Nuestra Misión: </span>
         "Desarrollar soluciones de calidad, innovadoras, rentables y que cumplan con todo lo que nuestos clientes necesiten. Establecer relaciones de confianza con nuestros clientes, las cuales sienten sus bases en la calidad de nuestros colaboradores y la buena comunicación".
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5 lg:gap-10 h-screen sm:h-auto p-2 md:p-6 lg:p-14">
  <img className="w-full h-full object-cover rounded-lg hover:scale-95 transition duration-1000 cursor-pointer" src={assets.Mecanica2} alt="" />
  <img className="w-full h-full object-cover rounded-lg hover:scale-95 transition duration-1000 cursor-pointer" src={assets.Mecanica3} alt="" />
  <img className="w-full h-full object-cover rounded-lg hover:scale-95 transition duration-1000 cursor-pointer" src={assets.Mecanica4} alt="" />
  <img className="w-full h-full object-cover rounded-lg hover:scale-95 transition duration-1000 cursor-pointer" src={assets.Mecanica5} alt="" />
</div>
    </section>
  );


  /*
  h-[85vh] flex items-center justify-center bg-gray-100 mt-3 text-center
  
  */
}

export default Nosotros;