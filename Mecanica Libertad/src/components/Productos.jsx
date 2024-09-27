import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from './Title'
import { get, ref } from 'firebase/database';
import { database } from '../firebase';
import ProductItem from './ProductItem';

const Productos = () => {

    let [productArray, setProductsArray] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{

            try {
                const dbRef = ref(database, "productos")

            const snapShot = await get(dbRef)

            if (snapShot.exists()) {

                setProductsArray(Object.values(snapShot.val()))
                
            } else{
                console.log("No hay datos")
            }
                
            } catch (error) {
                console.error("Error fetching data", error)
            }
            
        };

        fetchData();
    }, [database])



  return (
    <section id='productos' className='w-10/12 mx-auto text-center mb-10 '>
        <Title text1={"Nuestros"} text2={"Productos"}/>
        

            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-1'>

            {/* Productos */}
            <div className='flex flex-col items-center hover:scale-105 hover:outline hover:outline-4 hover:outline-red-500 transition duration-1000 cursor-pointer'>
                    <div>
                        <img className="w-80 h-80 object-fill rounded-sm " src={assets.Mecanica2} alt="" />
                    </div>
                    <div className='bg-gray-200 w-80 lg:w-full'>
                    <p className=''>Producto1</p>
                    <p>Precio aproximado: $50.000</p></div>
                    <p></p>
                    

            </div>


            </div>
       
        
    </section>
    
  )
}

export default Productos