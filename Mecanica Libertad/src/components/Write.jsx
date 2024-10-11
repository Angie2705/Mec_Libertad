import React, {useEffect, useState} from 'react';
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

  const handleCaracteristicas = () =>{
    if (caracteristica.trim()) {
      setCaracteristicas([...caracteristicas, caracteristica]);
      setCaracteristica('');
    }
  }

  const handleDeleteCaracteristicas = (index) =>{
    setCaracteristicas((e)=>{
      e.filter((_,i)=> i !== index)
    })
  }

  const handleImageChange = (e)=>{

   const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Guardamos el archivo de imagen
    }
    
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const precioParse = parseInt(precio,10);

    try {

      let imageUrl = "";

      if(imageFile){
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
      console.error("Error al agregar producto: ",error);
    }
    
  }

  useEffect(()=>{
    console.log(caracteristicas)

    
  })

  return (
    <div className='grid grid-rows-5 text-center p-5 w-1/4 mx-auto gap-3'>
        <label htmlFor="">Nombre</label>
          <input className='border border-gray-400' type="text" value={nombre} onChange={(e)=>{
          setNombre(e.target.value)
        }}/>
        <label htmlFor="">Precio</label>
          <input type="text" value={precio} onChange={(e)=>{
          setPrecio(e.target.value)
        }} />
        <label htmlFor="">Descripción</label>
          <input type="text" value={desc} onChange={(e)=>{
          setDesc(e.target.value)
        }} />
        <label htmlFor="">Imagen</label>
          <input type="file" onChange={handleImageChange} />
        
        <label htmlFor="">Características</label>
        <input type="text" value={caracteristica} onChange={(e)=>{
          setCaracteristica(e.target.value)
        }} />
        <button className='bg-blue-500 text-white px-2 ml-2' onClick={handleCaracteristicas}>Añadir Caracteristica</button>

        <ul className='mt-2'>
          {caracteristicas.map((carac,index)=>(
            <li key={index} className='border-b'>Característica {index+1}: {carac} 
            
            <button onClick={() => handleDeleteCaracteristicas(index)}>X</button>
            </li>
            
          ))}
        </ul>

        <button className='bg-gray-300' onClick={handleSubmit}>Save Data</button>

        
    </div>
  )
}

export default Write