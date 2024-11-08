import { get, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../firebase';
import Header from './Header';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
const FichaProducto = ({admin}) => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { fireBaseId } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState({
    nombre: [],
    imagen: [],
    precio: [],
    desc: [],
  })

  const navigate = useNavigate();


  const handleImageFile = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setImageFile(file)
    }
  }


  useEffect(() => {

    const fetchData = async () => {

      const dbRef = doc(db, 'productos/' + fireBaseId);

      const snapShot = await getDoc(dbRef);

      if (snapShot.exists()) {
        const productObject = snapShot.data()
        console.log(productObject.imagen)
        setName(productObject.nombre)
        setPrice(productObject.precio)
        setDesc(productObject.descripcion)
        setImageFile(productObject.imagen)
        setProduct(productObject)
        
      } else {
        console.log("Error")
      }

      setImageFile(null)
    }

    fetchData()
  }, [fireBaseId])

  const updateProduct = async (e) => {
    e.preventDefault()
    console.log(imageFile)

    const errorNombre = validateName(name)
    const errorPrecio = validatePrice(price)
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
    
    } else{
      try {

        let imgUrl = "";
  
        if (imageFile) {
          const imgStorageRef = storageRef(storage, `productos/${imageFile.name}`)
  
          const snapshotImage = await uploadBytes(imgStorageRef, imageFile);
          console.log("Imagen subida correctamente: " + snapshotImage)
  
          imgUrl = await getDownloadURL(imgStorageRef)
        }
  
        const dbRef = doc(db, 'productos/' + fireBaseId)
  
        if (!imgUrl) {
          throw new Error("No se pudo obtener el URL de la imagen")
        }
  
  
  
        await setDoc(dbRef, {
          nombre: name,
          precio: price,
          descripcion: desc,
          imagen: imgUrl,
        })
  
        setName("")
        setPrice("")
        setDesc("")
        setImageFile(null)
        console.log("Producto cambiado correctamente")
        navigate('/producto')
  
      } catch (error) {
        console.log("Error: " + error)
      }
    }

  }

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
    setName(value)
    
    const error = validateName(value)

    setError((e)=>({
      ...e,
      nombre: error ? [error] : []
      
    }))
  }

  const handlePrice = (e) =>{
    const value = e.target.value
    setPrice(value)
    
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

  return product ? (
    <>
      <Header />
      <div className='mt-24 px-10 md:px-6 transition-opacity ease-in duration-500 opacity-100'>
        <div className='flex gap-10 flex-col md:flex-row lg:mx-20 mb-5'>
          <h1 className='md:hidden font-medium text-center text-3xl'>{product.nombre}</h1>
          
          {/*Imagen de producto*/}
          <div className='flex-1 flex flex-col-reverse gap-3 md:flex-row'>
            <div className='flex md:flex-col overflow-x-auto md:overflow-y-scroll gap-2 md:gap-0 justify-between md:justify-normal md:w-[17%] w-full'>
              <img src={product.imagen} className='w-[24%] md:w-full md:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            </div>
            <div className='w-full md:w-[80%]'>
              {/* detalle*/}
              <img className='w-full h-[85vh]' src={product.imagen} alt="" />
            </div>
          </div>


          {/*info producto*/}
          <div className='flex-1 p-1 md:p-0'>
            {/* Vista Modificar Producto */}
            {
              admin ? (
                <>
                  <div className='flex flex-col mb-4'>
                    <label htmlFor="" className='mb-1 font-medium text-lg'>Nombre</label>
                    <input type="text" className='bg-gray-700 text-white rounded-xl text-md w-full lg:w-11/12 p-3'
                       value={name} onChange={handleName}/>
                    {/*Manejo Errores Nombre */}
                    {error.nombre.length > 0 && (
                      <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
                        {error.nombre.flat().map((err,index)=>(
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    )}   

                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Imagen:</label>
                    <input type="file" className='bg-gray-700 text-white rounded-xl text-md w-full lg:w-11/12 p-3' 
                      onChange={handleImageFile}/>
                     {/*Manejo Errores Imagen */}
                    {error.imagen.length > 0 && (
                      <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
                        {error.imagen.map((err,index)=>(
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    )} 

                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Descripción:</label>
                    <textarea className='h-screen text-md bg-gray-700 text-white rounded-xl w-full lg:w-11/12 lg:h-60 p-3' 
                      wrap="hard" name="" value={desc} onChange={handleDesc}></textarea>
                     {/*Manejo Errores Descripción */}
                     {error.desc.length > 0 && (
                      <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
                        {error.desc.map((err,index)=>(
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    )} 

                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Precio aproximado:</label>
                    <input type="text" className='bg-gray-700 text-white rounded-xl text-md w-full lg:w-11/12 p-3' 
                      value={price} onChange={handlePrice} />
                     {/*Manejo Errores Precio */}
                     {error.precio.length > 0 && (
                      <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
                        {error.precio.map((err,index)=>(
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    )} 

                    <button className='mt-5 px-4 py-2 w-40 text-base rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateProduct}>Realizar Cambios</button>
                  </div>
                </>
              ) : (
                //Vista Ficha Producto
                <>
                  <h1 className='hidden md:flex font-medium text-3xl'>{product.nombre}</h1>
                  <p className='md:mt-5 text-black text-justify md:w-full'> {product.descripcion}</p>
                  <p className='mt-4 text-lg font-medium'>Precio Aproximado: ${product.precio}</p>
                </>
              )
            }

          </div>
        </div>
      </div>
    </>
  ) : <div className='opacity-0'></div>
}

export default FichaProducto


/*<>
    <Header />
    <div className='md:pt-16 mt-14 transition-opacity ease-in duration-500 opacity-100 md:pb-14 px-10 lg:px-6'> 
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            <img src={product.imagen} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
          </div>

          <div className='w-full sm:w-[80%]'>
             <img className='w-full h-[85vh]' src={product.imagen} alt="" />
          </div>

        </div> 



        <div className='flex-1'>
          {
            admin ? (
            <>
              <label htmlFor="">Nombre:</label> <br />
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                  type="text" value={name} onChange={(e)=>{
              setName(e.target.value)
              }} />
            </> 
            ) : (
              <h1 className='font-medium text-2xl mt-1'>{product.nombre}</h1>  
            )
          }
          
          
          <div className='flex items-center gap-1 mt-2'>
            <h2>Precio aproximado:</h2>
          </div>
          {
            admin ? (
              <>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={price} onChange={(e)=>{
                setPrice(e.target.value)
                }} />
              
              <h2 className='pt-2'>Descripción:</h2>

              <textarea className='block p-2.5 h-screen lg:w-1/2 lg:h-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' name="" value={desc} onChange={(e)=>{
                  setDesc(e.target.value)
                  }}></textarea>

              <h2>Imagen:</h2><br />
              <input type="file" onChange={handleImageFile} />

              <button className='mt-3 bg-red-400 rounded-xl text-black p-2' onClick={updateProduct}>Realizar Cambios</button>
              </>

            ) : (
              <> 
                <p className='mt-5 text-3xl font-medium'> ${product.precio}</p>
                <p className='mt-5 text-gray-500 md:w-4/5'> {product.descripcion}</p>
              </>
            )
          }
        </div>   
      </div>

    </div>
  </>
  ) : <div className='opacity-0'></div>*/