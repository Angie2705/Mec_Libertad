import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../firebase';
import Header from './Header';
import { doc, getDoc } from 'firebase/firestore';

const FichaProducto = ({admin}) => {


  const [imageFile, setImageFile] = useState([]);
  let [loading, setLoading] = useState([])
  const [caracteristicas, setCaracteristicas] = useState([])
  const { fireBaseId } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState({
    nombre: [],
    imagen: [],
    precio: [],
    desc: [],
    caract: [],
  })
  const [seeInfo, setSeeInfo] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      
      setLoading(true)
      const dbRef = doc(db, 'productos/' + fireBaseId);


      const snapShot = await getDoc(dbRef);

      if (snapShot.exists()) {
        const productObject = snapShot.data()
        setImageFile(productObject.imagen)
        setProduct(productObject)
        setCaracteristicas(productObject.caracteristicas)

        productObject.forEach((_, index)=>{
          setTimeout(()=>{
              setLoading((prev)=>{
                  const updatedLoading = [...prev]
                  updatedLoading[index] = false;
                  return updatedLoading
              })
          }, 1000)
      })
        
      } else {
        console.log("Error")
      }
    }

    fetchData()

    console.log("caracteristicas: "+product.caracteristicas)
  }, [fireBaseId])


  return product ? (
    <>
      <Header />
      <div className='mt-24 px-10 md:px-6 transition-opacity ease-in duration-500 opacity-100'>
        <div className='flex gap-10 flex-col md:flex-row lg:mx-20 mb-5'>
          <h1 className='md:hidden font-medium text-center text-3xl'>{product.nombre}</h1>
          
          {/*Imagen de producto*/}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto md:overflow-y-scroll gap-2 md:gap-0 justify-between md:justify-normal md:w-[17%] w-full'>
             {
              product.imagen?.length > 0 && (
              product.imagen.map((item, key)=>(
                <img key={key} src={item} className='w-[14%] md:w-full h-[20vh] md:mb-3 flex-shrink-0 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 border-solid' onClick={()=>setImageFile(item)} alt="" />
              )))
             }
              
            </div>
            <div className='w-full md:w-[80%]'>
              {/* detalle*/}
              <img className='w-full h-[85vh]' src={imageFile} alt=""  onChange={console.log("")} />
            </div>
          </div>


          <div className='flex-1 p-1 md:p-0'>       
                <>
                  <h1 className='hidden md:flex font-medium text-3xl'>{product.nombre}</h1>
                  <p className='md:mt-5 text-black text-justify md:w-full'> {product.descripcion}</p>
                  <p className='mt-4 text-lg font-medium'>Precio Aproximado: ${product.precio}</p> 
                  {
                    caracteristicas.length > 0 && (<>
                    <p className='mt-4 text-lg font-medium'>Caracteristicas del producto:</p>
                    <ul className='list-disc list-inside text-md mt-2'>
                        {
                          product.caracteristicas.map((car, index)=>(
                            <li key={index}>{car}</li>
                          ))
                        }
                      </ul>
                    </>
                      
                    )
                  }
                </>
          </div>
        </div>
      </div>
    </>
  ) : <div className='opacity-0'></div>
}

export default FichaProducto