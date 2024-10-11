import React, { useState } from 'react'
import { database } from '../firebase'
import { ref,  get } from 'firebase/database'
const Read = () => {

    let [productsArray, setProductsArray] = useState([]);

    const fetchData = async () =>{
        
        const dbRef = ref(database, "productos")

        const snapShot = await get(dbRef);

        if (snapShot.exists()) {
            setProductsArray(Object.values(snapShot.val()))
            console.log(Object.keys(snapShot.val()))
        } else{
            alert("error");
        }
    }

    console.log(productsArray)


  return (
    <div>
        <button onClick={fetchData}>VerProductos</button>
        <ul>{productsArray.map((item,index)=>(
            <li key={index}>
                {item.nombre} : {item.precio} : {item.productId}
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Read