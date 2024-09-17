import React from 'react';

function Servicios() {
  return (
    <section id="servicios" className=" h-[85vh] flex items-center justify-center bg-gray-200 text-center">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Servicios</h2>
        <ul className="text-lg text-gray-700 space-y-4">
          <li>- Asesoramiento personalizado.</li>
          <li>- Entrega a domicilio.</li>
          <li>- Garantía de satisfacción en todos nuestros productos.</li>
          <li>- Atención al cliente disponible 24/7.</li>
        </ul>
      </div>
    </section>
  );
}

export default Servicios;