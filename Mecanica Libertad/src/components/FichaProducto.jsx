import { get, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { database, storage } from '../firebase';
import Header from './Header';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
const FichaProducto = ({admin}) => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { fireBaseId } = useParams();
  const [product, setProduct] = useState([]);
  console.log(fireBaseId)

  const navigate = useNavigate();

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file)
    }
  }


  useEffect(() => {

    const fetchData = async () => {

      const dbRef = ref(database, 'productos/' + fireBaseId);

      const snapShot = await get(dbRef);

      if (snapShot.exists()) {
        const productObject = snapShot.val()
        console.log(productObject)
        setName(productObject.nombre)
        setPrice(productObject.precio)
        setDesc(productObject.descripcion)
        setImageFile(productObject.imagen)
        setProduct(productObject)
      } else {
        console.log("Error")
      }
    }

    fetchData()
  }, [fireBaseId])

  const updateProduct = async (e) => {
    e.preventDefault()

    try {

      let imgUrl = "";

      if (imageFile) {
        const imgStorageRef = storageRef(storage, `productos/${imageFile.name}`)

        const snapshotImage = await uploadBytes(imgStorageRef, imageFile);
        console.log("Imagen subida correctamente: " + snapshotImage)

        imgUrl = getDownloadURL(imgStorageRef)
      }

      const dbRef = ref(database, 'productos/' + fireBaseId)

      if (!imgUrl) {
        throw new Error("No se pudo obtener el URL de la imagen")
      }



      await set(dbRef, {
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

  console.log(product)

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
                       value={name} onChange={(e) => {
                        setName(e.target.value)
                      }}/>

                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Imagen:</label>
                    <input type="file" className='bg-gray-700 text-white rounded-xl text-md w-full lg:w-11/12 p-3' 
                      onChange={handleImageFile}/>

                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Descripción:</label>
                    <textarea className='h-screen text-md bg-gray-700 text-white rounded-xl w-full lg:w-11/12 lg:h-60 p-3' 
                      name="" value={desc} onChange={(e) => {
                      setDesc(e.target.value)
                    }}></textarea>

                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Precio aproximado:</label>
                    <input type="text" className='bg-gray-700 text-white rounded-xl text-md w-full lg:w-11/12 p-3' 
                      value={price} onChange={(e) => {
                      setPrice(e.target.value)
                    }} />

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