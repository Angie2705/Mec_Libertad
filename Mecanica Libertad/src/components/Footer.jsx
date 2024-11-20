import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    const phoneNumber = "56974655804";
    const message = "Hola que tal!";


  return (

<footer className="bg-white">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                    <img src={assets.logo} alt="" />
                 
              </a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-4 sm:grid-cols-2">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contactos</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} className="text-green-600 hover:text-green-500">Whatsapp</a>
                      </li>
                      <li>
                          <span>+569 74655804</span>
                      </li>
                  </ul>
              </div>
              <div >
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Ubicación</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <span>Teniente Mery #1962, Conchalí Santiago de Chile</span>
                      </li>
                      
                  </ul>
              </div>

          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">MecanicaLibertad™</a>. All Rights Reserved.
          </span>
      </div>
    </div>
</footer>

  )
}

export default Footer