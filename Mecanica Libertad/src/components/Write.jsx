import React, {useState} from 'react';
import { database, storage } from '../firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref, set, push } from 'firebase/database';

const Write = () => {
  let [nombre, setNombre] = useState("");
  let [precio, setPrecio] = useState("");
  let [desc, setDesc] = useState("");
  let [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e)=>{
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const precioParse = parseInt(precio,10);

    try {

      let imageUrl = "";

      if(imageFile){
        const imageRef = storageRef(storage, `productos/${imageFile.name}`)

        await uploadBytes(imageRef, imageFile);

        imageUrl = await getDownloadURL(imageRef);
      }

      //referencia a la ubicación de la bd donde se guardará
      const productsRef = ref(database, 'productos');

      //Se usa await para esperar a que push finalice antes de continuar
      await push(productsRef, {
        nombre: nombre,
        precio: precioParse,
        descripcion: desc,
        imagen: imageUrl,
      });
      //Limpiar campos
      setNombre('');
      setPrecio('');
      setDesc('');
      setImageFile(null);

      alert("Producto agregado");

    } catch (error) {
      console.error("Error al agregar producto: ",error)
    }
    
  }

  return (
    <div className='text-center p-5'>
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

        <button className='bg-gray-300' onClick={handleSubmit}>Save Data</button>
    </div>
  )
}

export default Write