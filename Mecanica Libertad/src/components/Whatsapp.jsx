import React from 'react'
import { assets } from '../assets/assets';

const Whatsapp = () => {

    const phoneNumber = "56974655804";
    const message = "Hola que tal!";

  return (
    <div>
        <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} target='blank' rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition duration-300 ease-in-out fixed bottom-6 right-24">
            <img className='h-10' src={assets.Whatsapp} alt="" />
        </a>
    </div>
  )
}

export default Whatsapp