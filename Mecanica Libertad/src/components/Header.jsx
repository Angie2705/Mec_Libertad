import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from 'react-router-dom'


const Header = () =>{

    const [showNavBar, setShowNavBar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavBar = () =>{
      if (typeof window != 'undefined') {
        if (window.scrollY < lastScrollY) {
          setShowNavBar(true)
        } else{
          setShowNavBar(false)
        }
  
        setLastScrollY(window.scrollY)
      }
    }

    
    
    useEffect(()=>{

      if (typeof window != 'undefined') {
        window.addEventListener('scroll',controlNavBar)

        return () =>{
          window.removeEventListener('scroll', controlNavBar)
        };
      }
   
    }, [lastScrollY]);
    

    return(
        <nav className={`z-40 mb-16 lg:fixed flex mx-auto items-center justify-between lg:px-10 px-8 lg:w-full bg-white transition-transform duration-700 ${showNavBar ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex lg:flex-1">
            <a href="">
              <img src={assets.logo} alt="" />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a className="text-sm font-semibold leading-6 text-gray-900" href="">Inicio</a>
            <a className="text-sm font-semibold leading-6 text-gray-900" href="">Nosotros</a>
            <a className="text-sm font-semibold leading-6 text-gray-900" href="">Servicios</a>
            <NavLink to='/producto'>
              <a className="text-sm font-semibold leading-6 text-gray-900" href="">Productos</a>
            </NavLink>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a className="text-sm font-semibold leading-6 text-gray-900" href="">Log in</a>
          </div>
          
        </nav>
    );
}

export default Header;