import React, { useEffect, useState } from 'react';
import { database, storage } from '../firebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { getDatabase, ref, set, push } from 'firebase/database';

const Write = () => {
  let [nombre, setNombre] = useState("");
  let [precio, setPrecio] = useState("");
  let [desc, setDesc] = useState("");
  let [imageFile, setImageFile] = useState(null);
  let [caracteristica, setCaracteristica] = useState("");
  let [caracteristicas, setCaracteristicas] = useState([]);

  const handleCaracteristicas = () => {
    if (caracteristica.trim()) {
      setCaracteristicas([...caracteristicas, caracteristica]);
      setCaracteristica('');
    }
  }

  const handleDeleteCaracteristicas = (index) => {
    setCaracteristicas((e) => {
      e.filter((_, i) => i !== index)
    })
  }

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Guardamos el archivo de imagen
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const precioParse = parseInt(precio, 10);

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
      const productsRef = ref(database, 'productos');

      //Se usa await para esperar a que push finalice antes de continuar
      await push(productsRef, {
        nombre: nombre,
        precio: precioParse,
        descripcion: desc,
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

  useEffect(() => {
    console.log(caracteristicas)
  })

  return (
    <form className='bg-white py-6 lg:py-7 px-6 lg:px-20 w-4/5 md:w-3/5 h-full rounded-2xl shadow-md'>
      <div className='absolute'>
        <button className='text-black border-2 border-gray-400 hover:bg-gray-400 text-lg rounded-full w-10 h-10'>
          <a href="">X</a>
        </button>
      </div>

      <h1 className='text-center text-3xl font-semibold mb-5 md:mb-12'>Nuevo Producto</h1>

      <div className='my-2 md:my-6 md:flex justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Nombre:</label>
        <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" value={nombre} onChange={(e) => {
          setNombre(e.target.value)
        }} />
      </div>

      <div className='my-2 md:my-6 md:flex justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Imagen:</label>
        <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="file" onChange={handleImageChange} />
      </div>

      <div className='my-2 md:my-6 md:flex justify-between items-center'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Precio:</label>
        <input className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" value={precio} onChange={(e) => {
          setPrecio(e.target.value)
        }} />
      </div>

      <div className='my-2 md:my-6 md:flex justify-between'>
        <label className='mr-3 font-semibold text-lg' htmlFor="">Descripción:</label>
        <textarea className='border-2 border-gray-400 rounded-xl w-full md:w-3/4 p-2' type="text" rows={3} value={desc} onChange={(e) => {
          setDesc(e.target.value)
        }} />
      </div>

      <div className='my-2 md:my-6 md:flex justify-between'>
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

                <button onClick={() => handleDeleteCaracteristicas(index)}>X</button>
              </li>

            ))}
          </ul>
          <button className='bg-gray-600 hover:bg-black text-white text-base rounded-full w-48 h-10' onClick={handleCaracteristicas}>Añadir Caracteristica</button>

          
        </div>


        <button className='bg-red-600 text-white hover:bg-red-700 text-base rounded-full justify-end w-24 h-10'>Guardar</button>
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