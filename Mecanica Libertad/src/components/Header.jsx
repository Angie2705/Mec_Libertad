import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Header = ({ user }) => {

  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [modal, setModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const showModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const changeRoute = () => {
    context.router.push("/")
  }

  const logOut = async () => {
    const auth = getAuth();

    const currentUser = auth.currentUser;

    if (currentUser) {
      const userRef = doc(db, "users/", currentUser.email)

      await setDoc(userRef, { activeToken: null }, { merge: true })

      setLoading(true)
      setTimeout(() => {

        signOut(auth).then(() => {
          localStorage.removeItem("authToken")
          console.log("Log out successful")
          setModal(false)
          setLoading(false)
        }).catch((e) => {
          console.log("Error: " + e)
        })
      }, 2000)
    }
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
    { name: "Inicio", link: "/#inicio" },
    { name: "Nosotros", link: "/#nosotros" },
    { name: "Servicios", link: "/#servicios" },
    { name: "Productos", link: "/producto" },
    { name: "Contactos", link: "/#contacto" },
    { name: "Cotización", link: "/cotizacion" }
  ]

  let [open, setOpen] = useState(false);

  return (
    <>
      <nav className={`z-40 fixed bg-white w-full top-0 shadow-md md:py-4 rounded-md transition-transform duration-700 ${showNavBar ? 'translate-y-0' : '-translate-y-full'} `}>
        <div className="md:flex items-center w-full">

          <div onClick={changeRoute} className="md:absolute pl-5 bg-white cursor-pointer">
            <img src={assets.logo} alt="" />
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
              ${open ? 'top-16 opacity-100' : 'top-[-140px]'} md:opacity-100 opacity-0`}>
            {
              Links.map((Link) => (
                <li key={Link.name} className="hover:bg-gray-200 md:hover:bg-gray-200 px-6 md:px-4 py-2 rounded-md duration-150"> <a href={Link.link}>{Link.name}</a> </li>
              ))
            }
            {
              user ? <>
                <li key="PanelAdmin" className="hover:bg-gray-200 md:hover:bg-gray-200 px-6 md:px-4 py-2 rounded-md duration-150"> <a href={"/tablaadmin"}>Administrador</a> </li>
                <button onClick={showModal} className="bg-red-200 rounded-lg p-2">Cerrar Sesión</button>
              </>
                : ""
            }

          </ul>
        </div>
      </nav>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">

            {
              loading ? <div className="flex flex-col items-center justify-center h-full w-full mt-4 ">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid"></div>
                <p className="mt-4 text-lg text-gray-700">Cerrando sesión...</p>
              </div> : <>
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-3 text-gray-600 hover:text-gray-800 text-3xl p">
                  &times;
                </button>
                <div className="grid grid-col-2 ">
                  <h2 className="text-2xl font-semibold mx-auto">¿Seguro de cerrar sesión?</h2>

                  <div className="flex justify-between pt-6">
                    <button
                      onClick={closeModal}
                      className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                      Cancelar
                    </button>
                    <button
                      onClick={logOut}
                      className="mt-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                      Cerrar Sesión
                    </button>
                  </div>
                </div></>
            }

          </div>
        </div>
      )}

    </>
  );
}

export default Header;
