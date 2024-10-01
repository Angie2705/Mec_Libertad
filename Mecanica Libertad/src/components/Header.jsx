import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from 'react-router-dom'

const Header = () => {

  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavBar = () => {
    if (typeof window != 'undefined') {
      if (window.scrollY < lastScrollY) {
        setShowNavBar(true)
      } else {
        setShowNavBar(false)
      }

      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {

    if (typeof window != 'undefined') {
      window.addEventListener('scroll', controlNavBar)

      return () => {
        window.removeEventListener('scroll', controlNavBar)
      };
    }


  }, [lastScrollY]);

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className={`bg-white shadow-md md:py-4 transition-transform duration-700 ${showNavBar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex items-center">

        <div className="md:absolute pl-5">
          <a href="">
            <img className=" " src={assets.logo} alt="" />
          </a>
        </div>

        <div className="absolute end-5 top-5">
          <button data-collapse-toggle="navbar-sticky" type="button" class=" items-center justify-center inline-flex md:hidden p-2 w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
                  dark:text-black dark:hover:bg-gray-500 dark:focus:ring-gray-500" aria-controls="navbar-sticky" aria-expanded="false" onClick={toogleMenu}>
            <svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <ul class="hidden md:flex w-full justify-center md:gap-x-8 bg-white text-gray-900 font-semibold text-sm lg:text-base">
          <li className="hover:bg-gray-300 px-4 py-2 rounded-md"> <a href="">Inicio</a> </li>
          <li className="hover:bg-gray-300 px-4 py-2 rounded-md"> <a href="">Nosotros</a> </li>
          <li className="hover:bg-gray-300 px-4 py-2 rounded-md"> <a href="">Servicios</a> </li>
          <li className="hover:bg-gray-300 px-4 py-2 rounded-md">
            <NavLink to='/producto'> <a href="">Productos</a> </NavLink>
          </li>
        </ul>
      </div>

      {isMenuOpen ? (
        <ul id="navlinks" className="transition-all duration-700 ease-in-out flex-col absolute w-full md:hidden px-20 text-center bg-white text-gray-900 font-semibold text-sm">
          <li className="h-6 px-6 hover:bg-gray-300 rounded-md"> <a href="">Inicio</a> </li>
          <li className="py-3 px-6 hover:bg-gray-300 rounded-md"> <a href="">Nosotros</a> </li>
          <li className="py-3 px-6 hover:bg-gray-300 rounded-md"> <a href="">Servicios</a> </li>
          <li className="py-3 px-6 hover:bg-gray-300 rounded-md">
            <NavLink to='/producto'> <a href="">Productos</a> </NavLink>
          </li>
        </ul>
      ) : null}

    </nav>
  );
}

export default Header;

/*
<nav className="bg-white  ">
        <div className=" md:px-6 md:flex items-center bg-white">
          
          
            <img className="pl-4 md:p-1" src={assets.logo} alt=""/>
                  
           <div className="hidden md:flex ">
              <a className="text-sm font-semibold leading-6 " href="">Inicio</a>
              <a className="text-sm font-semibold leading-6 text-gray-900" href="">Nosotros</a>
              <a className="text-sm font-semibold leading-6 text-gray-900" href="">Servicios</a>
              <NavLink to='/producto'>
                <a className="text-sm font-semibold leading-6 text-gray-900" href="">Productos</a>
              </NavLink>
            </div>
            
        </div>
      </nav> 

<div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a className="hidden text-sm font-semibold leading-6 text-gray-900" href="">Log in</a>
        </div>

<button type="button" class=" text-sm text-gray-900 font-semibold leading-6 focus:ring-4 rounded-lg px-4 py-2 text-center">Log in</button>
 ul css:flex-col border border-gray-100 rounded-lg bg-gray-50  rtl:space-x-reverse   md:border-0 md:bg-white



 
          

      <nav class="bg-white shadow-md fixed w-full z-20 top-0 start-0">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="" class="h-8" alt="Flowbite Logo"/>
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
                <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                  </svg>
                </button>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
              </li>
              <li>
                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>





 transition-transform duration-700 ${showNavBar ? 'translate-y-0' : '-translate-y-full'}         
          
          */
