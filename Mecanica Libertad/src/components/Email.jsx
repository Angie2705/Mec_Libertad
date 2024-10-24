import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from "react-hook-form";


const Email = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const form = useRef();

    const sendEmail = () => {
        
        emailjs
            .sendForm('service_iks3wy7', 'template_a42hcv7', form.current, {
                publicKey: 'kMgjA03zPI2Dp4xxD',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    alert('Mensaje enviado exitosamente');
                    reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    alert('Error al enviar el mensaje');
                },
            );
    };

    return (
        <div className="bg-white rounded-lg p-4 w-full">
            <h2 className="text-black text-2xl font-semibold text-center">Email</h2>
            <p className="text-md text-black text-center mt-5 mb-10 word-space" style={{ wordSpacing: '8px' }}>
                Contactanos por Email a través del siguiente formulario.
            </p>

            <form ref={form} onSubmit={handleSubmit(sendEmail)} className="w-full flex flex-col items-center">
                <div className='flex flex-col items-center mb-4 md:mb-5 w-full'>
                    <input type="text" name="user_name" placeholder="Nombre y Apellido"
                        className="w-10/12 md:w-4/5 p-2 border-2 border-gray-400 rounded-xl" 
                        {...register("user_name", {
                            required: {
                                value: true,
                                message: "El campo es requerido"
                            },
                            pattern: {
                                value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/i,
                                message: "Escriba su primer nombre y primer apellido"
                            }
                        })}/>
                    {errors.user_name && <span className='text-red-600 text-sm'>{errors.user_name.message}</span>}
                </div>

                <div className='flex flex-col items-center mb-4 md:mb-5 w-full'>
                    <input type="email" name="user_email" placeholder="Correo Electrónico"
                        className="w-10/12 md:w-4/5 p-2 border-2 border-gray-400 rounded-xl"
                        {...register("user_email", {
                            required: {
                                value: true,
                                message: "El campo es requerido"
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "El formato no es correcto"
                            }
                        })} />
                    {errors.user_email && <span className='text-red-600 text-sm'>{errors.user_email.message}</span>}
                </div>

                <div className='flex flex-col items-center mb-4 md:mb-5 w-full'>
                    <textarea name="messagee" placeholder="Mensaje"
                        className="w-10/12 md:w-4/5 h-56 p-2 border-2 border-gray-400 rounded-xl" {...register("messagee", {
                            required: {
                                value: true,
                                message: "El campo es requerido"
                            },
                            minLength: {
                                value:30,
                                message: "El mensaje no es válido"
                            }
                        })} />
                    {errors.messagee && <span className='text-red-600 text-sm'>{errors.messagee.message}</span>}
                    
                </div>

                <button type="submit" value="Send" className="w-28 p-2 mb-3 bg-red-600 
                    text-white rounded-full hover:bg-red-700">Enviar</button>

            </form>
        </div>
    )
};
export default Email;