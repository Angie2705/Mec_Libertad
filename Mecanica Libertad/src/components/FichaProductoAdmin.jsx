import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../firebase';
import Header from './Header';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, setDoc, where, query } from 'firebase/firestore';

const FichaProductoAdmin = ({ admin }) => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([])
  let [caracteristica, setCaracteristica] = useState("");
  let [loading, setLoading] = useState([])
  const { fireBaseId } = useParams();
  const [product, setProduct] = useState([]);

  const [error, setError] = useState({
    nombre: [],
    imagen: [],
    precio: [],
    desc: [],
    caract: [],
  })

  const navigate = useNavigate();

  const handleImageFile = (e) => {
    const file = Array.from(e.target.files); // Convierte FileList en un array
    if (file.length > 0) {
      setImageFile(file);
    }
  };

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true)
      const dbRef = doc(db, 'productos/' + fireBaseId);
      const snapShot = await getDoc(dbRef);

      if (snapShot.exists()) {
        const productObject = snapShot.data()

        setName(productObject.nombre)
        setPrice(productObject.precio)
        setDesc(productObject.descripcion)
        setImageFile([])
        setCaracteristicas(productObject.caracteristicas)
        setProduct(productObject)

        productObject.forEach((_, index) => {
          setTimeout(() => {
            setLoading((prev) => {
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

  }, [fireBaseId])

  const updateProduct = async (e) => {
    e.preventDefault()
    if (name !== product.nombre) {
      const isDuplicate = await checkDuplicateProduct(name)
      if (isDuplicate) {
        setError((error) => ({
          ...error,
          nombre: ["El nombre ya existe"]
        }))
        return;
      }
    }

    const errorNombre = validateName(name)
    const errorPrecio = validatePrice(price)
    const errorDesc = validateDesc(desc)
    const errorCaract = validateCaract(caracteristicas)

    if (errorNombre || errorPrecio || errorDesc || errorCaract) {
      setError({
        nombre: errorNombre ? errorNombre : [],
        precio: errorPrecio ? [errorPrecio] : [],
        desc: errorDesc ? [errorDesc] : [],
        caract: errorCaract ? [errorCaract] : [],
      });

    } else {
      try {

        let imageUrls = [];

        if (imageFile.length > 0) {

          for (const img of imageFile) {
            const imgStorageRef = storageRef(storage, `productos/${img.name}`)

            //Subida de imagen al storage
            const snapshot = await uploadBytes(imgStorageRef, img);
            console.log('Imagen subida correctamente', snapshot)

            const imageUrl = await getDownloadURL(imgStorageRef);
            imageUrls.push(imageUrl)
          }

        } else {
          imageUrls = product.imagen || [];
        }

        const dbRef = doc(db, 'productos/' + fireBaseId)


        await setDoc(dbRef, {
          nombre: name,
          precio: price,
          descripcion: desc,
          imagen: imageUrls,
          caracteristicas
        });

        setName("")
        setPrice("")
        setDesc("")
        setImageFile([])
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
      errores.push("El nombre no puede estar vacío");
    }
    if (nombre.length >= 50) {
      errores.push("El nombre no puede ser mayor a 50 caracteres");
    }
    const regex = /^[A-Za-z0-9\s]+$/g;
    if (!regex.test(nombre)) {
      errores.push("El nombre no puede tener caracteres especiales");
    }
    return errores.length > 0 ? errores : null; // No hay error
  };

  const validatePrice = (precio) => {
    if (precio === '') {
      return "El precio no puede estar vacío"
    }
    const regex = /^\d+$/
    if (!regex.test(precio)) {
      return "El precio debe ser numérico"
    }

    return null;
  };

  const validateDesc = (desc) => {

    if (desc.length >= 400) {
      return "La descripción no puede superar los 400 caracteres"
    }

    return null;
  };

  const validateCaract = (caracteristica) => {
    let errores = []
    const regex = /^[a-zA-Z\s]*$/;
    if (caracteristica.length >= 100) {
      errores.push("La característica no puede superar los 100 caracteres")
    }

    return errores.length > 0 ? errores : null;
  };

  const handleDeleteCaracteristicas = (e, index) => {
    e.preventDefault(); // Previene el reinicio de la página
    setCaracteristicas((prevCaracteristicas) =>
      prevCaracteristicas.filter((_, i) => i !== index)
    );

  };

  const checkDuplicateProduct = async (nombre) => {
    const productsRef = collection(db, "productos")
    const question = query(productsRef, where("nombre", "==", nombre))
    const response = await getDocs(question)
    return !response.empty;
  }
  //FIN VALIDACIÓN ERRORES


  //MANEJO PROPIEDADES
  const handleName = (e) => {
    const value = e.target.value
    setName(value)

    const error = validateName(value)

    setError((e) => ({
      ...e,
      nombre: error ? [error] : ["El nombre tiene el formato correcto"]

    }))
  }

  const handlePrice = (e) => {
    const value = e.target.value
    setPrice(value)

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

    }

  }
  return product ? (
    <>
      <Header user={admin} />
      <div className='mt-24 px-10 md:px-6 transition-opacity ease-in duration-500 opacity-100'>
        <div className='flex gap-10 flex-col md:flex-row lg:mx-20 mb-5'>
          <h1 className='md:hidden font-medium text-center text-3xl'>{product.nombre}</h1>

          {/*Imagen de producto*/}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto md:overflow-y-scroll gap-2 md:gap-0 justify-between md:justify-normal md:w-[17%] w-full'>
              {
                product.imagen?.length > 0 && (
                  product.imagen.map((item, key) => (
                    <img key={key} src={item} className='w-[14%] md:w-full h-[20vh] md:mb-3 flex-shrink-0 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 border-solid' onClick={() => setImageFile(item)} alt="" />
                  )))
              }
            </div>

            <div className='w-full md:w-[80%]'>
              {/* detalle*/}
              <img className='w-full h-[85vh]' src={product.imagen} alt="" />
            </div>
          </div>


          {/*info producto*/}
          <div className='flex-1 p-1 md:p-0'>
            {/* Vista Modificar Producto */}
            {admin ? (
                <>
                  
                  <div className='flex flex-col mb-4'>
                    {/* Campo Nombre del Producto */}
                    <label htmlFor="" className='mb-1 font-medium text-lg'>Nombre</label>
                    <input type="text" className='bg-gray-700 text-white rounded-xl text-md w-full lg:w-11/12 p-3'
                      value={name} onChange={handleName} />
                    {/*Manejo Errores Nombre */}
                    {error.nombre.length > 0 && (
                      <ul className={`list-disc list-inside ${error.nombre == "El nombre tiene el formato correcto" ? "text-green-500" : "text-red-500"}  text-sm mt-2`}>
                        {error.nombre.flat().map((err, index) => (
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    )}

                    {/* Campo Imagen del Producto */}
                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Imagen:</label>
                    <input multiple type="file" className='bg-gray-700 text-white rounded-xl text-md w-full lg:w-11/12 p-3'
                      onChange={handleImageFile} />
                    {/*Manejo Errores Imagen */}
                    {error.imagen.length > 0 && (
                      <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
                        {error.imagen.map((err, index) => (
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    )}

                    {/* Campo Descripción del Producto */}
                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Descripción:</label>
                    <textarea className='h-screen text-md text-justify bg-gray-700 text-white rounded-xl w-full lg:w-11/12 lg:h-60 p-3'
                      wrap="hard" name="" value={desc} onChange={handleDesc}></textarea>
                    {/*Manejo Errores Descripción */}
                    {error.desc.length > 0 && (
                      <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
                        {error.desc.map((err, index) => (
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    )}

                    {/* Campo Precio Aprox. del Producto */}
                    <label htmlFor="" className='mt-4 mb-1 font-medium text-lg'>Precio aproximado:</label>
                    <input type="text" className='bg-gray-700 text-white rounded-xl text-md w-full lg:w-11/12 p-3'
                      value={price} onChange={handlePrice} />
                    {/*Manejo Errores Precio */}
                    {error.precio.length > 0 && (
                      <ul className='list-disc list-inside text-red-500 text-sm mt-2'>
                        {error.precio.map((err, index) => (
                          <li key={index}>{err}</li>
                        ))}
                      </ul>
                    )}

                    <div>
                      {/* Campo Caracteristicas del Producto */}
                      <label className='mr-3 font-semibold text-lg' htmlFor="">Características:</label>
                      <div className="flex w-full md:w-3/4 mt-2">
                        <textarea
                          className="text-white bg-gray-700 rounded-xl w-full p-2 mr-2"
                          type="text"
                          rows={1}
                          value={caracteristica}
                          onChange={handleCaracOnChange}
                        />
                        {/* Boton Añadir Caracteristicas */}
                        <button className="bg-gray-600 text-sm hover:bg-black text-white rounded-full w-28 h-10 flex-shrink-0"
                          onClick={handleCaracteristicas}>Añadir Caracteristica
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

                      <ul className='mt-2'>
                        {caracteristicas.map((carac, index) => (
                          <li key={index} className='flex items-center justify-between bg-gray-100 p-2 rounded-xl w-3/4 my-2 '>Característica {index + 1}: {carac}

                            <button className='ml-4 rounded px-2 bg-red-500' onClick={(e) => handleDeleteCaracteristicas(e, index)}>x</button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className='mt-5 px-4 py-2 w-40 text-base rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateProduct}>Realizar Cambios</button>
                  </div>
                </>
              ) : (
                //Vista de la Ficha de Producto.
                <>
                  <h1 className='hidden md:flex font-medium text-3xl'>{product.nombre}</h1>
                  <p className='md:mt-5 text-black text-justify md:w-full'> {product.descripcion}</p>
                  <p className='mt-4 text-lg font-medium'>Precio Aproximado: ${product.precio}</p>
                  {
                    caracteristicas.length > 0 && (
                      <>
                        <p className='mt-4 text-lg font-medium'>Caracteristicas del producto:</p>
                        <ul className='list-disc list-inside text-md mt-2'>
                          {
                            product.caracteristicas.map((car, index) => (
                              <li key={index}>{car}</li>
                            ))
                          }
                        </ul>
                      </>
                    )
                  }
                </>
              )
            }

          </div>
        </div>
      </div>
    </>
  ) : <div className='opacity-0'></div>
}

export default FichaProductoAdmin