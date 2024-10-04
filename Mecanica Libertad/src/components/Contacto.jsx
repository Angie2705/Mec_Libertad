import React from 'react';

function Contacto() {
  return (

    <section id="contacto" className="h-[85vh] text-center bg-gray-100 mt-3">

      <h2 className="w-full text-center text-4xl font-bold text-gray-800 p-6">Contáctanos</h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-y-0 gap-y-8 p-2'>
        <div className="flex flex-col text-left items-center justify-center rounded-lg md:py-10 bg-white ml-16 col-span-2 w-2/3" >

          <h2 className="text-black text-center">Email</h2>

          <p className="text-md text-black md:px-6 lg:px-12 lg:py-6 word-space rounded-lg text-justify" style={{ wordSpacing: '8px' }}>
            Puedes contactarnos a través del siguiente formulario, o visitarnos en nuestra tienda física.
          </p>

          <form className=" space-y-4">
            <div className="flex flex-col items-center">
              <label className="block text-sm font-bold mb-2"></label>
              <input
                type="text"
                placeholder="Nombre"
                className=" p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block text-sm font-bold mb-2"></label>
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="block text-sm font-bold mb-2"></label>
              <textarea
                placeholder="Mensaje"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacto;


/*<section id="contacto" className="h-[85vh] flex items-center justify-center bg-gray-100 text-center">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Contáctanos</h2>
        <p className="text-lg text-gray-700 mb-4">
          Puedes contactarnos a través del siguiente formulario, o visitarnos en nuestra tienda física.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Mensaje"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>*/