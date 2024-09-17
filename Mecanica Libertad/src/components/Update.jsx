import React, { useState } from 'react'
import { database } from '../firebase'
import { get, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Update = () => {

  let [productsArray, setProductsArray] = useState([]);

  const navigate = useNavigate();

    const fetchData = async () =>{
        
        const dbRef = ref(database, "productos")

        const snapShot = await get(dbRef);

        if (snapShot.exists()) {
            const Data = snapShot.val();

            const temporaryArray = Object.keys(Data).map(fireId=>{
                return{
                    ...Data[fireId],
                    productId: fireId
                }
            })
            setProductsArray(temporaryArray)
        } else{
            alert("error");
        }
    }

    console.log(productsArray)


  return (
    <div>
        <button onClick={fetchData}>VerProductos</button>
        <ul>{productsArray.map((item,index)=>(
            <li className='pb-3' key={index}>
                {item.nombre} : {item.precio} : {item.productId}
                <button className='btn bg-black rounded-xl text-white p-2' onClick={() => navigate(`/updatewrite/${item.productId}`)}> Update Product</button>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Update