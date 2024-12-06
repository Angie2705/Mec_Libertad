import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';


const Write = () => {
  let [nombre, setNombre] = useState("");
  let [precio, setPrecio] = useState("");
  let [desc, setDesc] = useState("");
  let [imageFile, setImageFile] = useState([]);
  let [caracteristica, setCaracteristica] = useState("");
  let [caracteristicas, setCaracteristicas] = useState([]);
  let [error, setError] = useState({
    nombre: [],
    imagen: [],
    precio: [],
    desc: [],
    caract: [],
  })

  let [alerta, setAlerta] = useState(false)

  const handleCaracOnChange = (e) => {
    const value = e.target.value;
    setCaracteristica(value)

    const errorCaract = validateCaract(value)

    setError((e) => ({
      ...e,
      caract: errorCaract ? [errorCaract] : []
    }))
  }

  const handleCaracteristicas = (e) => {
    e.preventDefault()
    if (error.caract.length == 0) {
      setCaracteristicas([...caracteristicas, caracteristica]);
      setCaracteristica('');
      console.log("O")

    }
    console.log(error.caract)
  }

  useEffect(() => {

  })

  const validateCaract = (caracteristica) => {
    let errores = []
    // const regex = /^[a-zA-Z\s]*$/;
    if (caracteristica.length >= 25) {
      errores.push("La característica no puede superar los 25 caracteres")
    }

    return errores.length > 0 ? errores : null;
  }

  const handleDeleteCaracteristicas = (e, index) => {
    e.preventDefault();
    setCaracteristicas((prevCaracteristicas) =>
      prevCaracteristicas.filter((_, i) => i !== index)
    );

  };

  const handleImageChange = (e) => {
    // Convierte FileList en un array
    const file = Array.from(e.target.files); 
    setImageFile(file);
    // Guardamos el archivo de imagen
    if (file) {
      setImageFile(file); 
      setError((e) => ({
        ...e,
        imagen: ["Imagen agregada correctamente"]
      }))
    } else {
      let errores = ["La imagen es obligatoria"]
      setError((e) => ({
        ...e,
        imagen: errores
      }))

    }

  }

  const checkDuplicateProduct = async (nombre) => {
    const productsRef = collection(db, "productos")
    const question = query(productsRef, where("nombre", "==", nombre))
    const response = await getDocs(question)
    return !response.empty;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isDuplicate = await checkDuplicateProduct(nombre)

    if (isDuplicate) {
      setError((error) => ({
        ...error,
        nombre: [...error.nombre, "El nombre ya existe"]
      }))
      return
    }

    const precioParse = parseInt(precio, 10);
    const errorNombre = validateName(nombre)
    const errorPrecio = validatePrice(precio)
    const errorDesc = validateDesc(desc)
    const errorImg = validateImage(imageFile)
    const errorCaract = validateCaract(caracteristica)

    console.log(errorNombre)

    if (errorNombre) {
      console.log("error nombre")
    }

    if (errorNombre || errorPrecio || errorDesc || errorImg || errorCaract) {
      setError({
        nombre: errorNombre ? errorNombre : [],
        imagen: errorImg ? [errorImg] : [],
        precio: errorPrecio ? [errorPrecio] : [],
        desc: errorDesc ? [errorDesc] : [],
        caract: errorCaract ? [errorCaract] : [],
      })
      console.log(error)
    }
    else {
      let descPredeterminada = "Aún no hay una descripción para este producto";
      try {
        let imageUrls = [];
        //Solo guarda y cambia la imagen si la variable de envío tiene datos.
        if (imageFile.length > 0) {

          for (const img of imageFile) {
            const imgStorageRef = storageRef(storage, `productos/${img.name}`)

            //Subida de imagen al storage
            const snapshot = await uploadBytes(imgStorageRef, img);
            console.log('Imagen subida correctamente', snapshot)

            const imageUrl = await getDownloadURL(imgStorageRef);
            imageUrls.push(imageUrl)
          }

        }

        //Referencia a la ubicación de la base de datos
        const productsRef = collection(db, 'productos');

        await addDoc(productsRef, {
          nombre: nombre,
          precio: precioParse,
          descripcion: desc === "" ? descPredeterminada : desc,
          imagen: imageUrls,
          caracteristicas
        });

        setAlerta(true)

        setTimeout(() => {
          setAlerta(false)
          console.log("3 segundos")
        }, 7000)

        //Limpiar campos
        setNombre('');
        setPrecio('');
        setDesc('');
        setImageFile(null);
        setCaracteristicas([]);


      } catch (error) {
        console.error("Error al agregar producto: ", error);
      }
    }
  }

  useEffect(() => {
  })

  //Validación de Errores

  const validateName = (nombre) => {
    let errores = [];

    if (!nombre.trim()) {
      errores.push("El nombre no puede estar vacío");
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

  const validatePrice = (precio) => {
    if (precio === '') {
      return "El precio no puede estar vacío"
    }
    const regex = /^\d+$/
    if (!regex.test(precio)) {
      return "El precio solo deben ser valores numéricos enteros"
    }
    return null;
  }

  const validateDesc = (desc) => {

    if (desc.length >= 500) {
      return "La descripción no puede superar los 500 caracteres"
    }
    return null;
  }

  const validateImage = (imagen) => {
    if (imagen.length == 0) {
      return "La imágen es obligatoria"
    }
  }
  //Fin de Validación de Errores


  //Manejo de Propiedades
  const handleName = (e) => {
    const value = e.target.value
    setNombre(value)
    console.log(value)

    const error = validateName(value)

    setError((e) => ({
      ...e,
      nombre: error ? [error] : ["El nombre tiene el formato correcto"]
    }))
  }

  const handlePrice = (e) => {
    const value = e.target.value
    setPrecio(value)

    const error = validatePrice(value)

    setError((e) => ({
      ...e,
      precio: error ? [error] : ["El precio tiene el formato correcto"]
    }))
  }

  const handleDesc = (e) => {
    const value = e.target.value
    setDesc(value)
    const error = validateDesc(value)

    setError((e) => ({
      ...e,
      desc: error ? [error] : []
    }))
  }

  return (
    <>
      <form className='bg-white py-6 lg:py-7 px-6 lg:px-20 w-4/5 md:w-3/5 rounded-2xl shadow-md'>
        <div className='absolute'>
          <button className='text-black border-2 border-gray-400 hover:bg-gray-400 text-lg rounded-full w-10 h-10'>
            <a href="/tablaadmin">X</a>
          </button>

        </div>

        <h1 className='text-center text-3xl font-semibold mb-5 md:mb-12'>Nuevo Producto</h1>
        <div className='my-2 md:my-6 md:flex flex-col justify-between items-center'>
          <label className='mr-3 font-semibold text-lg' htmlFor="">Nombre:</label>
          <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" value={nombre} onChange={handleName} />
          {/*Manejo Errores Nombre */}
          {error.nombre.length > 0 && (
            <ul className={`list-disc list-inside ${error.nombre == "El nombre tiene el formato correcto" ? "text-green-500" : "text-red-500"}  text-sm mt-2`}>
              {error.nombre.flat().map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )}

      </div>

      <div className='my-2 md:my-6 md:flex flex-col justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Imágenes:</label>
        <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' multiple type="file" onChange={handleImageChange} />
        {/*Manejo Errores Imagen */}
        {
          error.imagen.length > 0 && (
            <ul className={`list-disc list-inside ${error.imagen == "Imagen agregada correctamente" ? "text-green-500": "text-red-500"}  text-sm ml-2 mt-2`}>
              {error.imagen.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )
        }
      </div>
        
                

      <div className='my-2 md:my-6 md:flex flex-col justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Precio:</label>
        <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" value={precio} onChange={handlePrice} />{ }
        {/*Manejo Errores Precio */}
        {
          error.precio.length > 0 && (
            <ul className={`list-disc list-inside ${error.precio == "El precio tiene el formato correcto" ? "text-green-500" : "text-red-500"}  text-sm mt-2`}>
              {
                error.precio.map((err, index) => (
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
                  error.desc.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))
                }
              </ul>
            )
          }
        </div>

        <div className='my-2 md:my-6 md:flex flex-col items-center'>
          <label className='mr-3 font-semibold text-lg text-' htmlFor="">Características:</label>
          <div className="flex w-full md:w-3/4 mt-2">
            <textarea
              className="border-2 border-gray-400 rounded-xl w-full p-2 mr-2"
              type="text"
              rows={1}
              value={caracteristica}
              onChange={handleCaracOnChange}
            />
            <button
              className="bg-gray-600 text-sm hover:bg-black text-white rounded-full w-28 h-10 flex-shrink-0"
              onClick={handleCaracteristicas}
            >
              Añadir Caracteristica
            </button>
          </div>

          {

            error.caract.length > 0 && (

              <ul className='list-disc list-inside text-red-500 text-sm mt-2 w-full md:w-3/4'>
                {
                  error.caract.flat().map((err, index) => (
                    <li key={index}>{err}</li>
                  ))
                }
              </ul>
            )


          }

        </div>

        <div className='flex justify-between mt-8'>
          <div>
            <ul className='mt-2'>
              {caracteristicas.map((carac, index) => (
                <li key={index} className='flex items-center justify-between bg-gray-100 p-2 rounded m-2'>Característica {index + 1}: {carac}

                  <button className='ml-4 rounded px-2 bg-red-500' onClick={(e) => handleDeleteCaracteristicas(e, index)}>x</button>
                </li>

              ))}
            </ul>
          </div>

          <button onClick={handleSubmit} className='bg-red-600 text-white hover:bg-red-700 text-base rounded-full justify-end w-36 h-10'>Agregar Producto</button>
        </div>

      </form>

      {
        alerta && (
          <div
            className="fixed top-4 right-4 p-4 text-sm text-blue-800 rounded-lg bg-blue-50 shadow-lg transition-transform transform translate-x-full animate-slide-in-out"
            role="alert"
          >
            <span className="font-medium">¡Producto agregado!</span> El producto se agregó correctamente.
          </div>
        )
      }

    </>
  )
}

export default Write