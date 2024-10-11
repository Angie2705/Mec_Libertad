import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from 'react-router-dom'

const Header = () => {

  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const changeRoute = () =>{
    context.router.push("/")
  }

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

  

  let Links = [
    { name: "Inicio", link: "/" },
    { name: "Nosotros", link: "/" },
    { name: "Servicios", link: "/" },
    { name: "Productos", link: "/producto" }
  ]
  let [open, setOpen] = useState(false);

  return (
      <nav className={`z-40 lg:fixed bg-white w-full top-0 shadow-md md:py-4 rounded-md transition-transform duration-700 ${showNavBar ? 'translate-y-0' : '-translate-y-full'} `}>
        <div className="md:flex items-center w-full">
        
          <div onClick={changeRoute} className="md:absolute pl-5 bg-white cursor-pointer">
            <img className=" " src={assets.logo} alt="" />
          </div>
        
          <div onClick={() => setOpen(!open)} className="fixed end-5 top-5">
            <button data-collapse-toggle="navbar-sticky" type="button" className=" items-center justify-center inline-flex md:hidden p-2 w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
                    dark:text-black dark:hover:bg-gray-500 dark:focus:ring-gray-500" aria-controls="navbar-sticky" aria-expanded="false">
              <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <ul className={`md:flex w-full absolute md:static justify-center text-center md:gap-x-8 md:z-auto z-[-1]
            bg-white text-gray-900 font-semibold text-sm md:text-base px-20 py-3 md:p-0 transition-all duration-500 ease-in
              ${open ? 'top-20 opacity-100' : 'top-[-140px]'} md:opacity-100 opacity-0`}>
            {
              Links.map((Link) => (
                <li key={Link.name} className="hover:bg-gray-200 md:hover:bg-gray-200 px-6 md:px-4 py-2 rounded-md duration-150"> <a href={Link.link}>{Link.name}</a> </li>
              ))
            }
          </ul>
        </div>
      </nav>
  );
}

export default Header;

/*

<nav className={`bg-white shadow-md md:py-4 rounded-md transition-transform duration-700 ${showNavBar ? 'translate-y-0' : '-translate-y-full'}`}>
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
          <li className="hover:bg-gray-300 px-4 py-2 rounded-md duration-150"> <a href="">Inicio</a> </li>
          <li className="hover:bg-gray-300 px-4 py-2 rounded-md duration-150"> <a href="">Nosotros</a> </li>
          <li className="hover:bg-gray-300 px-4 py-2 rounded-md duration-150"> <a href="">Servicios</a> </li>
          <li className="hover:bg-gray-300 px-4 py-2 rounded-md duration-150">
            <NavLink to='/producto'> <a href="">Productos</a> </NavLink>
          </li>
        </ul>
      </div>

      {isMenuOpen ? (
        <ul id="navlinks" className={`md:hidden absolute w-full px-20 pb-3 text-center bg-white text-gray-900 font-semibold text-sm transition duration-500 ease-in ${open ? 'top-20':'top-[-490px]'}`}>
          <li className="py-2 px-6 hover:bg-gray-200 rounded-md"> <a href="">Inicio</a> </li>
          <li className="py-2 px-6 hover:bg-gray-200 rounded-md"> <a href="">Nosotros</a> </li>
          <li className="py-2 px-6 hover:bg-gray-200 rounded-md"> <a href="">Servicios</a> </li>
          <li className="py-2 px-6 hover:bg-gray-200 rounded-md">
            <NavLink to='/producto'> <a href="">Productos</a> </NavLink>
          </li>
        </ul>
      ) : null}

    </nav>            
          */
