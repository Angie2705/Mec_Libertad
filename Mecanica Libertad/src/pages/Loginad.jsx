import React from 'react'
import Forml from '../components/Forml'

const Loginad = () => {
    return (
        <section className='h-screen w-full flex items-center justify-center bg-red-800'>
            <div className='bg-white px-10 py-14 max-w-md rounded-3xl shadow-md'>
                <h1 className='text-center text-3xl font-semibold'>Bienvenido/a</h1>
                <Forml/>
            </div>
        </section>
    )
}

export default Loginad