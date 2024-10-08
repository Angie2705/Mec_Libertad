import React from 'react';

function Contacto() {
  return (
    <section id="contacto" className="h-full text-center bg-gray-100 mt-3">
      <h2 className="w-full text-center text-4xl font-bold text-gray-800 p-6">Contáctanos</h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-x-4 lg:gap-y-0 gap-y-8 p-2'>

        <div className="flex flex-col rounded-lg items-center py-3 md:py-6 px-5 bg-white w-10/12 lg:w-11/12">

          <h2 className="text-black text-center text-2xl font-semibold">Email</h2>

          <p className="text-md text-black mx-4 md:mx-0 md:px-6 lg:px-8 py-4 word-space rounded-lg text-justify" style={{ wordSpacing: '8px' }}>
            Contactanos por Email a través del siguiente formulario.
          </p>

          <form className="space-y-4 w-full">
            <div className="flex flex-col items-center">

              <input
                type="text" placeholder="Nombre"
                className="w-10/12 md:w-4/5 p-2 border mb-4 md:mb-7 border-gray-400 rounded-xl" />

              <input
                type="email" placeholder="Correo Electrónico"
                className="w-10/12 md:w-4/5 p-2 border mb-4 md:mb-7 border-gray-400 rounded-xl" />

              <textarea
                placeholder="Mensaje"
                className="w-10/12 md:w-4/5 h-40 p-2 border mb-4 md:mb-7 border-gray-400 rounded-xl" />

              <button
                type="submit"
                className="w-28 p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                Enviar
              </button>

            </div>
          </form>

        </div>

        <div className='bg-black text-white w-full'>2</div>
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