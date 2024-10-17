import React, { useEffect, useState } from 'react';
import { app, auth } from '../firebase';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



const Forml = () => {

    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    console.log(auth)
    const functionAuth = async (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(auth)
        console.log("e")
        
        if (register) {
            await createUserWithEmailAndPassword(auth, email, password)
        } else{
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }
    }




    
    return (
  
            <form onSubmit={functionAuth} className=' mt-10 space-y-4 md:space-y-6' >

                <div>
                    <label className='font-medium'>Correo Electrónico</label>
                    <input type="email" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="correo_actual" id="email"
                        placeholder="example@example.com" />
                </div>

                <div>
                    <label className='font-medium'>Contraseña</label>
                    <input type="password" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="contrasena_actual" id="password"
                        placeholder="Ingrese su Contraseña" />
                </div>

                <div className='flex justify-center items-center'>
                    <div id="error" class="alert alert-danger"></div>
                    <button type="submit" className="px-4 py-2 text-base rounded-full bg-red-600 text-white hover:bg-red-700">{register ? "Registrate" : "Iniciar sesión"}</button>
                    <h4>{register ? "Si ya tienes cuenta: " : "Si no tienes cuenta:"}
                        <button onClick={()=>setRegister(!register)} className='px-1  text-base rounded-full bg-gray-600 text-white hover:bg-red-700'>{register ? "Inicia sesión" : "Registrate"}</button>
                    </h4>
                    
                </div>

            </form>


    )
}

export default Forml