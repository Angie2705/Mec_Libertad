import React, { useEffect, useState } from 'react';
import {  db, storage } from '../firebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { getDatabase, ref, set, push } from 'firebase/database';
import { collection, addDoc } from 'firebase/firestore';

const Write = () => {
  let [nombre, setNombre] = useState("");
  let [precio, setPrecio] = useState("");
  let [desc, setDesc] = useState("");
  let [imageFile, setImageFile] = useState(null);
  let [caracteristica, setCaracteristica] = useState("");
  let [caracteristicas, setCaracteristicas] = useState([]);
  let [error, setError] = useState({
    nombre: [],
    imagen: [],
    precio: [],
    desc: [],
  })

  const handleCaracteristicas = (e) => {
    e.preventDefault()
    if (caracteristica.trim()) {
      setCaracteristicas([...caracteristicas, caracteristica]);
      setCaracteristica('');
    }
  }

  const handleDeleteCaracteristicas = (e, index) => {
    e.preventDefault(); // Previene el reinicio de la página
    setCaracteristicas((prevCaracteristicas) => 
      prevCaracteristicas.filter((_, i) => i !== index)
    );
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Guardamos el archivo de imagen
    } else{
      let errores = ["La imagen es obligatoria"]
      setError((e)=>({
        ...e,
        imagen: errores
      }))

      
    }

  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const precioParse = parseInt(precio, 10);

    const errorNombre = validateName(nombre)
    const errorPrecio = validatePrice(precio)
    const errorDesc = validateDesc(desc)
    const errorImg = validateImage(imageFile)
    
    console.log(errorNombre)

    if (errorNombre) {
      console.log("error nombre")
    }

    if (errorNombre || errorPrecio || errorDesc || errorImg) {
      setError({
        nombre: errorNombre ? errorNombre : [],
        imagen: errorImg ? [errorImg]: [],
        precio: errorPrecio ? [errorPrecio] : [],
        desc: errorDesc ? [errorDesc] : [],
      })
      console.log(error)
      
       
      
    
    }         
    else{
      let descPredeterminada = "Aún no hay una descripción para este producto";
      try {

       

        let imageUrl = "";
  
        if (imageFile) {
          const imgStorageRef = storageRef(storage, `productos/${imageFile.name}`)
  
          //Subida de imagen al storage
          const snapshot = await uploadBytes(imgStorageRef, imageFile);
          console.log('Imagen subida correctamente', snapshot)
  
          imageUrl = await getDownloadURL(imgStorageRef);
        }
  
        if (!imageUrl) {
          throw new Error("No se pudo obtener la URL de la imagen.");
        }
  
        //referencia a la ubicación de la bd donde se guardará
        const productsRef = collection(db, 'productos');
        
        
        //Se usa await para esperar a que push finalice antes de continuar
        await addDoc(productsRef, {
          nombre: nombre,
          precio: precioParse,
          descripcion: desc === "" ? descPredeterminada: desc,
          imagen: imageUrl,
          caracteristicas: caracteristicas,
        });
  
        
        //Limpiar campos
        setNombre('');
        setPrecio('');
        setDesc('');
        setImageFile(null);
        setCaracteristicas([]);
  
        alert("Producto agregado");
  
      } catch (error) {
        console.error("Error al agregar producto: ", error);
      }
    }


  }

  useEffect(() => {
   
  })

 //VALIDACIÓN ERRORES

const validateName = (nombre) => {

    let errores = [];
    if (!nombre.trim()) {
        errores.push("El nombre no puede estar vacío") ;
    }
    if (nombre.length >= 50) {
        errores.push("El nombre no puede ser mayor a 50 caracteres");
    }
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(nombre)) {
        errores.push("El nombre no puede tener caracteres especiales o números");
    }

    
    return errores.length > 0 ? errores : null; // No hay error
};
  const validatePrice = (precio) =>{
    if (precio === '') {
      return "El precio no puede estar vacío"
    }
    const regex = /^\d+$/
    if (!regex.test(precio)) {
      return "El precio solo deben ser valores numéricos"
    }

    return null;
  }

  const validateDesc = (desc) =>{

    if (desc.length >= 200) {
      return "La descripción no puede superar los 200 caracteres"
    }

    return null;
  }

  const validateImage = (imagen)=>{
    if (!imagen) {
      return "La imágen es obligatoria"
    }
  }
//FIN VALIDACIÓN ERRORES


//MANEJO PROPIEDADES
  const handleName = (e) =>{
    const value = e.target.value 
    setNombre(value)
    
    const error = validateName(value)

    setError((e)=>({
      ...e,
      nombre: error ? [error] : []
      
    }))
  }

  const handlePrice = (e) =>{
    const value = e.target.value
    setPrecio(value)
    
    const error = validatePrice(value)

    setError((e)=>({
      ...e,
      precio: error ? [error] : []
    }))


  }

  const handleDesc = (e) =>{
    const value = e.target.value
    setDesc(value)
    const error = validateDesc(value)

    setError((e)=>({
      ...e,
      desc: error ? [error] : []
    }))
  }


  return (
    <form className='bg-white py-6 lg:py-7 px-6 lg:px-20 w-4/5 md:w-3/5  rounded-2xl shadow-md'>
      <div className='absolute'>
        <button className='text-black border-2 border-gray-400 hover:bg-gray-400 text-lg rounded-full w-10 h-10'>
          <a href="">X</a>
        </button>
      </div>

      <h1 className='text-center text-3xl font-semibold mb-5 md:mb-12'>Nuevo Producto</h1>

      <div className='my-2 md:my-6 md:flex flex-col justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Nombre:</label>
        <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" value={nombre} onChange={handleName} />

        {/*Manejo Errores Nombre */}
        {error.nombre.length > 0 && (
          <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
            {error.nombre.flat().map((err,index)=>(
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        
      </div>

      <div className='my-2 md:my-6 md:flex flex-col justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Imagen:</label>
        <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="file" onChange={handleImageChange} />
        {/*Manejo Errores Imagen */}
        {
          error.imagen.length >0 && (
            <ul className='list-disc list-inside text-red-500 text-sm ml-2 mt-2'>
            {error.imagen.map((error,index)=>(
              <li key={index}>{error}</li>
            ))}
            </ul>
          )
        }
      </div>

      <div className='my-2 md:my-6 md:flex flex-col justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Precio:</label>
        <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" value={precio} onChange={handlePrice} />{}
        {/*Manejo Errores Precio */}
        {
          error.precio.length > 0 && (
            <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
              {
                error.precio.map((err,index)=>(
                  <li key={index}>{err}</li>
                ))
              }
            </ul>
          )
        }
      </div>

      <div className='my-2 md:my-6 md:flex flex-col justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Descripción:</label>
        <textarea className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" rows={3} value={desc} onChange={handleDesc} />
        {/*Manejo Errores Descripción */}
        {
          error.desc.length > 0 && (
            <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
              {
                error.desc.map((err,index)=>(
                  <li key={index}>{err}</li>
                ))
              }
            </ul>
          )
        }
      </div>

      <div className='my-2 md:my-6 md:flex justify-between flex-col items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Características:</label>
        <textarea className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" rows={1} value={caracteristica} onChange={(e) => {
          setCaracteristica(e.target.value)
        }} />
      </div>

      <div className='flex justify-between mt-8'>
        <div>
        <ul className='mt-2'>
            {caracteristicas.map((carac, index) => (
              <li key={index} className='border-b'>Característica {index + 1}: {carac}

                <button onClick={(e) => handleDeleteCaracteristicas(e,index)}>X</button>
              </li>

            ))}
          </ul>
          <button className='bg-gray-600 hover:bg-black text-white text-base rounded-full w-48 h-10' onClick={handleCaracteristicas}>Añadir Caracteristica</button>

          
        </div>


        <button onClick={handleSubmit} className='bg-red-600 text-white hover:bg-red-700 text-base rounded-full justify-end w-24 h-10'>Guardar</button>
      </div>



    </form>
  )
}

export default Write

/*<form className='grid grid-rows-5 text-center p-5 mx-auto gap-3'>
      <label htmlFor="">Nombre</label>
      <input className='border border-gray-400' type="text" value={nombre} onChange={(e) => {
        setNombre(e.target.value)
      }} />

      <label htmlFor="">Precio</label>
      <input type="text" value={precio} onChange={(e) => {
        setPrecio(e.target.value)
      }} />

      <label htmlFor="">Descripción</label>
      <input type="text" value={desc} onChange={(e) => {
        setDesc(e.target.value)
      }} />

      <label htmlFor="">Imagen</label>
      <input type="file" onChange={handleImageChange} />

      <label htmlFor="">Características</label>
      <input type="text" value={caracteristica} onChange={(e) => {
        setCaracteristica(e.target.value)
      }} />

      <button className='bg-blue-500 text-white text-base rounded-full w-48 h-10' onClick={handleCaracteristicas}>Añadir Caracteristica</button>

      <ul className='mt-2'>
        {caracteristicas.map((carac, index) => (
          <li key={index} className='border-b'>Característica {index + 1}: {carac}

            <button onClick={() => handleDeleteCaracteristicas(index)}>X</button>
          </li>

        ))}
      </ul>

      <button className='bg-red-600 text-white  hover:bg-red-700 text-base rounded-full w-32 h-10'>Save Data</button>
    </form>*/