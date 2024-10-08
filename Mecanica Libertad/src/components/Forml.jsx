import React from 'react';

const Forml = () => {
    return (
        <div className='bg-white px-10 py-14 rounded-3xl shadow-md'>

            <h1 className='text-center text-3xl font-semibold'>Bienvenido/a</h1>

            <form action="" method="GET" name="" className=' mt-10 space-y-4 md:space-y-6' id="Inicio_Sesion">

                <div>
                    <label className='font-medium'>Correo Electrónico</label>
                    <input type="email" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="correo_actual" id="correo_actual"
                        placeholder="example@example.com" />
                </div>

                <div>
                    <label className='font-medium'>Contraseña</label>
                    <input type="password" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="contrasena_actual" id="contrasena_actual"
                        placeholder="Ingrese su Contraseña" />
                </div>

                <div className='flex justify-center items-center'>
                    <div id="error" class="alert alert-danger"></div>
                    <button type="submit" className="px-4 py-2 text-base rounded-full bg-red-600 text-white hover:bg-red-700">Ingresar</button>
                </div>

            </form>

        </div>
    )
}

export default Forml