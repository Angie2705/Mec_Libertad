import React, {useState} from 'react';
import { database } from '../firebase';
import { getDatabase, ref, set, push } from 'firebase/database';

const Write = () => {
  let [nombre, setNombre] = useState("");
  let [precio, setPrecio] = useState("");
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const precioParse = parseInt(precio,10);

    try {
      //referencia a la ubicación de la bd donde se guardará
      const productsRef = ref(database, 'productos');

      //Se usa await para esperar a que push finalice antes de continuar
      await push(productsRef, {
        nombre: nombre,
        precio: precioParse,
      });
      //Limpiar campos
      setNombre('');
      setPrecio('');

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

        <button className='bg-gray-300' onClick={handleSubmit} >Save Data</button>
    </div>
  )
}

export default Write