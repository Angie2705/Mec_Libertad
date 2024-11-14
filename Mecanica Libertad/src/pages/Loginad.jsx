import React from 'react'
import { assets } from "../assets/assets";
import Forml from '../components/Forml'

const Loginad = () => {
    return (
        <section className='h-screen w-full flex items-center justify-center bg-red-800'>
            <div className='bg-white px-10 pb-14 pt-8 max-w-md rounded-3xl shadow-md flex flex-col items-center'>
                <a href="/"><img className="w-full mb-6 shadow-md" src={assets.logo} alt="" /></a>
                <h1 className='text-center text-3xl font-semibold'>Bienvenido/a</h1>

                <Forml/>
            </div>
        </section>
    )
}

export default Loginad