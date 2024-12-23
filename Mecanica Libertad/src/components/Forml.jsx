import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Forml = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    let [alerta, setAlerta] = useState(false)
    let [alerta2, setAlerta2] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const functionAuth = async (data) => {

        setLoading(true)
        try {
            const userRef = doc(db, "users", data.email)
            const userDoc = await getDoc(userRef)
            const { activeToken } = userDoc.data()
            if (activeToken != null && userDoc.exists()) {
                console.log("exists")
                if (activeToken) {
                    setAlerta(true)
                    setTimeout(() => {
                        setAlerta(false)
                        console.log("3 segundos")
                    }, 8000)
                    setLoading(false)
                    return
                }
            }

            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            console.log(userDoc.data)

            const token = await user.getIdToken()

            await setDoc(userRef, { activeToken: token }, { merge: true })

            console.log("token usuario: " + token)
            localStorage.setItem("authToken", token)

            setTimeout(() => {
                setLoading(false)
                navigate('/')

            }, 2000)

        } catch (error) {
            alert('Correo o constraseña Inválidos', error);
            console.log(error)
            setLoading(false)
        }
    };


    useEffect(() => {

        const logOut = () => {
            // auth.signOut()
        }

        window.addEventListener('beforeunload', logOut)
        return () => window.removeEventListener('beforeunload', logOut)
    }, [])

    return (
        <>
            {loading ? <div className="flex flex-col items-center justify-center h-1/2 w-1/2 mt-4">
                <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-red-500 border-solid"></div>
                <p className="mt-4 text-lg text-gray-700">Cargando...</p>
            </div>
                :
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
                        <button type="submit" className="px-4 py-2 text-base rounded-full bg-red-600 text-white hover:bg-red-700">Iniciar Sesión</button>
                    </div>
                </form>}
            {
                alerta && (
                    <div className="fixed top-4 right-4 p-4 text-sm text-blue-800 rounded-lg bg-blue-50 shadow-lg 
                        transition-transform transform translate-x-full animate-slide-in-out" role="alert">
                        <span className="font-medium">Ya existe una sesión activa con este usuario</span> Prueba a iniciar sesión con otro usuario
                    </div>
                )
            }
            {
                alerta2 && (
                    <div
                        className="fixed top-4 right-4 p-4 text-sm text-blue-800 rounded-lg bg-blue-50 shadow-lg 
                        transition-transform transform translate-x-full animate-slide-in-out" role="alert">
                        <span className="font-medium">Inicio de sesión exitoso</span>
                    </div>
                )
            }

        </>
    )
}

export default Forml