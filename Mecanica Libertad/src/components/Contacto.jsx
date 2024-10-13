import React, { useState } from 'react';

function Contacto() {
  let direc1 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.1909261627734!2d-70.6781775890592!3d-33.39218277330176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c68ec9598175%3A0x9cd4c0fdc4dcc4a3!2sTeniente%20Mery%201962%2C%208551032%20Santiago%2C%20Conchal%C3%AD%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1728589845504!5m2!1ses-419!2scl"
  let direc2 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1087.5901932276338!2d-70.39289408084011!3d-23.525208001864268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96ae298429fc0001%3A0x60515cb052155f8c!2sCalle%209%20425%2C%20galp%C3%B3n%2012-A%2C%20Antofagasta!5e0!3m2!1ses-419!2scl!4v1728596434106!5m2!1ses-419!2scl"
  
  const [direction, setDirection] = useState(direc1)

  

  const di1=()=> {
    setDirection(direc1)
  }

  const di2 =()=> {
    setDirection(direc2)
  }

  return (
    <section id="contacto" className="h-full text-center bg-gray-200 px-10 pb-10 pt-5">
      <h2 className="w-full text-center text-4xl font-bold text-gray-800 p-6">Contáctanos</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-x-7 gap-y-8 lg:gap-y-0'>
        
        <div className="bg-white rounded-lg p-6 w-full">
          <h2 className="text-black text-2xl font-semibold text-center">Email</h2>
          <p className="text-md text-black text-center my-5 word-space" style={{ wordSpacing: '8px' }}>
            Contactanos por Email a través del siguiente formulario.
          </p>

          <form className="w-full">
            <div className="flex flex-col items-center">

              <input type="text" id="name" placeholder="Nombre"
                className="w-10/12 md:w-4/5 p-2 mb-4 md:mb-7 border-2 border-gray-400 rounded-xl"/>

              <input type="email" id="email" placeholder="Correo Electrónico"
                className="w-10/12 md:w-4/5 p-2 mb-4 md:mb-7 border-2 border-gray-400 rounded-xl"/>

              <textarea id="message" placeholder="Mensaje"
                className="w-10/12 md:w-4/5 h-56 p-2 mb-4 md:mb-7 border-2 border-gray-400 rounded-xl"/>

              <button type="submit"
                className="w-28 p-2 bg-red-600 text-white rounded-full hover:bg-red-700">Enviar
              </button>

            </div>
          </form>

        </div>

        <div className="rounded-lg p-6 bg-white w-full">
          <h2 className="text-black text-center text-2xl font-semibold mb-4">Ubicación</h2>
          <button onClick={()=>di1()} id="dr1" className='bg-gray-400 text-white focus:outline-none focus:ring focus:ring-red-600 w-full h-10 mb-2 rounded-lg'>direccion 1</button>
          <button onClick={()=>di2()} id="dr2" className='bg-gray-400 text-white focus:outline-none focus:ring focus:ring-red-600 w-full h-10 mb-2 rounded-lg'>direccion 2</button>
          <iframe src={`${direction}`} className="w-full h-64 md:h-2/3 mt-4 border-4 shadow-lg" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>
    </section>
  );
}

export default Contacto;
    
/*const [status, setStatus]= useState("Submit")
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setStatus("Sending...");
    const {name, email, message} =e.target.elements
    let details = {
      name: name.value,
      email: email.value,
      message: message.value
}}*/

/*
<iframe src={`${di1()}`} className="w-full h-64 md:h-2/3 mt-4 border-4 shadow-lg" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
onClick={()=>di1()}

  
  document.querySelector("#dr2").addEventListener("click", () => {
      console.log("ubicación 2");
    });
    
    
    
    var dir1 = document.getElementById("dr1");
  if(dir1){
    dir1.addEventListener("click", () => {
      console.log("ubicación 1");
    });
  }*/ 