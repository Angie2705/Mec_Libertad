import React, { useEffect, useState } from 'react';
import { app, auth } from '../firebase';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";


const Forml = () => {

    const navigate = useNavigate();
    const [regis, setRegister] = useState(false);
    console.log(auth)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const functionAuth = async (data) => {
        
        if (regis) {
            await createUserWithEmailAndPassword(auth, data.email, data.password)
        } else {
            try {
                await signInWithEmailAndPassword(auth, data.email, data.password);
                alert('Inicio de sesión exitoso');
                navigate('/')
            } catch (error) {
                alert('Correo o constraseña Inválidos');
            }
        }
    };

    const functionAuth1 = async (e) => {

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(auth)
        console.log("e")

        if (regis) {
            await createUserWithEmailAndPassword(auth, email, password)
        } else {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }
    }


    return (

        <form onSubmit={handleSubmit(functionAuth)} className=' mt-10 space-y-4 md:space-y-6'>

            <div>
                <label className='font-medium'>Correo Electrónico</label>
                <input className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="email" id="email"
                    placeholder="example@example.com" {...register('email', {
                        required: {
                            value: true,
                            message: "El campo es requerido"
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "El formato no es correcto"
                        }
                    })} />
                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
            </div>

            <div>
                <label className='font-medium'>Contraseña</label>
                <input type="password" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="password" id="password"
                    placeholder="Ingrese su Contraseña" {...register('password', {
                        required: {
                            value: true,
                            message: "El campo es requerido"
                        },
                    })} />
                {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
            </div>

            <div className='flex justify-center items-center'>
                <button type="submit" className="px-4 py-2 text-base rounded-full bg-red-600 text-white 
                    hover:bg-red-700">{regis ? "Registrate" : "Iniciar sesión"}</button>
                <h4>{regis ? "Si ya tienes cuenta: " : "Si no tienes cuenta:"}
                    <button onClick={() => setRegister(!regis)} className='px-1 text-base rounded-full bg-gray-600 text-white 
                        hover:bg-red-700'>{regis ? "Inicia sesión" : "Registrate"}</button>
                </h4>
            </div>

        </form>

    )
}

export default Forml

/*<form onSubmit={functionAuth} className=' mt-10 space-y-4 md:space-y-6' >*/

/*correo: /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9 */

/*
-----------------------------------------------------------
const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    console.log(auth)

    const functionAuth = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(auth)
        console.log("e")

        if (register) {
            await createUserWithEmailAndPassword(auth, email, password)
        } else {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }
    }

const form = {};

    const [errors, setErrors] = useState([]);

    const handleSubmit =(event) => {
        event.preventDefault()
        const err = onValidate(form)

        if (err == null){
            console.log("Enviando") 
        } else {
            setErrors(err)
        }
    }

    const onValidate = (form) => {
        let isErrors = false;
        let errors = {};

        if (!form.correo) {
            errors.correo = 'El campo "Correo Electronico" no puede estar vacío.'
            isErrors = true
        }

        if (!form.contrasena) {
            errors.contrasena = 'El campo "Contraseña" no puede estar vacío.'
            isErrors = true
        }

        return isErrors ? errors : null

    }

    return (

        <form onSubmit={handleSubmit} className=' mt-10 space-y-4 md:space-y-6' >

            <div>
                <label className='font-medium'>Correo Electrónico</label>
                <input type="email" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="correo_actual" id="email"
                    placeholder="example@example.com" value={form.correo}/>
                {errors.correo && <div className="alert alert-danger p-1">{errors.correo}</div>}
            </div>

            <div>
                <label className='font-medium'>Contraseña</label>
                <input type="password" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="contrasena_actual" id="password"
                    placeholder="Ingrese su Contraseña" />
                {errors.contrasena && <div className="alert alert-danger p-1">{errors.contrasena}</div>}
            </div>

            <div className='flex justify-center items-center'>
                <button type="submit" className="px-4 py-2 text-base rounded-full bg-red-600 text-white hover:bg-red-700">{register ? "Registrate" : "Iniciar sesión"}</button>
                <h4>{register ? "Si ya tienes cuenta: " : "Si no tienes cuenta:"}
                    <button onClick={() => setRegister(!register)} className='px-1  text-base rounded-full bg-gray-600 text-white hover:bg-red-700'>{register ? "Inicia sesión" : "Registrate"}</button>
                </h4>

            </div>

        </form> 
        
        
        
-------------------------------------------------------------------------------    
        
        
        
<form onSubmit={functionAuth} className=' mt-10 space-y-4 md:space-y-6' >

            <div>
                <label className='font-medium'>Correo Electrónico</label>
                <input type="email" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="correo_actual" id="email"
                    placeholder="example@example.com"
                    {...register("correo",{
                        required :{
                            value: true,
                            message: "El campo es requerido"
                        },
                        pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "El formato no es correcto"
                        }
                    })}/>
            </div>

            <div>
                <label className='font-medium'>Contraseña</label>
                <input type="password" className="w-full border-2 border-gray-400 rounded-xl p-2 mt-1" name="contrasena_actual" id="password"
                    placeholder="Ingrese su Contraseña" {...register("contra",{
                        required :{
                            value: true,
                            message: "El campo es requerido"
                        },
                        minLength:{
                            value: 8,
                            message: "contraseña inválida"

                        }
                    })}/>
                
            </div>

            <div className='flex justify-center items-center'>
                <button type="submit" className="px-4 py-2 text-base rounded-full bg-red-600 text-white hover:bg-red-700">{register ? "Registrate" : "Iniciar sesión"}</button>
                <h4>{register ? "Si ya tienes cuenta: " : "Si no tienes cuenta:"}
                    <button onClick={() => setRegister(!register)} className='px-1  text-base rounded-full bg-gray-600 text-white hover:bg-red-700'>{register ? "Inicia sesión" : "Registrate"}</button>
                </h4>

            </div>

        </form>*/