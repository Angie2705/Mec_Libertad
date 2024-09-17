import React from 'react';

function Contacto() {
  return (
    <section id="contacto" className="h-[85vh] flex items-center justify-center bg-gray-100 text-center">
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
    </section>
  );
}

export default Contacto;