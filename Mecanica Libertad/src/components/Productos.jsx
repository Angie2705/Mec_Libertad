import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from './Title'
import { get, ref } from 'firebase/database';
import { db } from '../firebase';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';


const Productos = ({ admin }) => {

    let [productArray, setProductsArray] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const dbRef = collection(db, "productos")
                const snapShot = await getDocs(dbRef)
                
                if (!snapShot.empty) {
                    
                    const temporaryArray = snapShot.docs.map((doc) => ({
                      ...doc.data(),
                      productId: doc.id, 
                    }));
                    
                    setProductsArray(temporaryArray); 
                  } else {
                    console.log("No hay datos en la colección productos");
                  }
                
            } catch (error) {
                console.error("Error fetching data", error)
            }

        };
        console.log(productArray)

        fetchData();
    }, [db])

    return (
        <section id='productos' className='w-10/12 min-h-screen mx-auto'>
            <div className='text-center sm:text-left sm:text-3xl'>
                <div className='inline-flex gap-2 items-center mb-3'>
                    <p className=' text-gray-500'>Nuestros <span className=' text-red-700 font-medium'>Productos</span></p>
                    <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-red-700'></p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {/* Productos */}
                {/* <div className='flex flex-col items-center hover:scale-105 hover:outline hover:outline-4 hover:outline-red-500 transition duration-1000 cursor-pointer'>
                    <div>
                        <img className="w-80 h-80 object-fill rounded-sm " src={assets.Mecanica2} alt="" />
                    </div>
                    <div className='bg-gray-200 w-80 lg:w-full'>
                    <p className=''>Producto1</p>
                    <p>Precio aproximado: $50.000</p></div>
                    <p></p>
            </div> */}
                {productArray.map((key, index) => (
                    <div className='cursor-pointer' key={index} onClick={() => navigate(`/producto/${key.productId}`)}>
                        <ProductItem key={index} image={key.imagen} name={key.nombre} price={key.precio} desc={key.desc} admin={admin} navProduct={() => navigate(`/producto/${key.productId}`)} />

                    </div>
                ))}

            </div>

        </section>

    )
}

export default Productos