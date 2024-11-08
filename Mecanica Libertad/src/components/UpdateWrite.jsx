import { push, ref, set, get } from 'firebase/database';
import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { useParams } from 'react-router-dom';


const UpdateWrite = () => {
    let [nombre, setNombre] = useState("");
    let [precio, setPrecio] = useState("");

    const {fireBaseId} = useParams();
    console.log(fireBaseId)

    useEffect(()=>{
      const fetchData = async () =>{

        const dbRef = ref(db, 'productos/'+fireBaseId);

        const snapShot = await get(dbRef);

        if (snapShot.exists()) {
          const targetObject = snapShot.val();
          setNombre(targetObject.nombre)
          setPrecio(targetObject.precio)
        } else{
          alert("error")
        }
      }

      fetchData();
    }, [fireBaseId])
    
    const overWriteData = async (e) =>{
      e.preventDefault();
      
      const precioParse = parseInt(precio,10);
  
      try {
        //referencia a la ubicación de la bd donde se guardará
        const productsRef = ref(database, 'productos/'+fireBaseId);
  
        //Se usa await para esperar a que push finalice antes de continuar
        await set(productsRef, {
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
        <h1>UPDATE PAGE</h1>
          <label htmlFor="">Nombre</label>
            <input className='border border-gray-400' type="text" value={nombre} onChange={(e)=>{
            setNombre(e.target.value)
          }}/>
          <label htmlFor="">Precio</label>
            <input type="text" value={precio} onChange={(e)=>{
            setPrecio(e.target.value)
          }} />
  
          <button className='bg-gray-300' onClick={overWriteData} >Update</button>
      </div>
    )
}

export default UpdateWrite