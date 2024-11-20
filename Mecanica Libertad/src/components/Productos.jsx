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
    let [loading, setLoading] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true)

            try {
                const dbRef = collection(db, "productos")
                const snapShot = await getDocs(dbRef)
                setTimeout(()=>{
                    
                    if (!snapShot.empty) {
                    
                        const temporaryArray = snapShot.docs.map((doc) => ({
                          ...doc.data(),
                          productId: doc.id, 
                        }));
                        
                        setProductsArray(temporaryArray); 
                        setLoading(new Array(temporaryArray.length).fill(true))

                        temporaryArray.forEach((_, index)=>{
                            setTimeout(()=>{
                                setLoading((prev)=>{
                                    const updatedLoading = [...prev]
                                    updatedLoading[index] = false;
                                    return updatedLoading
                                })
                            }, 1000)
                        })
                        

                        
                      } else {
                        console.log("No hay datos en la colección productos");
                      }
                },2000)
                
                
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
    {productArray.map((key, index) => (
        <div
            key={key.productId || index} // Aquí debe estar el key único para cada iteración
            className="cursor-pointer"
        >
            {loading[index] ? (
                <div className="flex flex-col items-center justify-center h-full w-full mt-4 py-32">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-red-500 border-solid"></div>
                    <p className="mt-4 text-lg text-gray-700">Cargando...</p>
                </div>
            ) : (
                <div onClick={() => navigate(`/producto/${key.productId}`)}>
                    <ProductItem
                        image={key.imagen}
                        name={key.nombre}
                        price={key.precio}
                        desc={key.desc}
                        admin={admin}
                        navProduct={() =>
                            navigate(`/productoAdmin/${key.productId}`)
                        }
                    />
                </div>
            )}
        </div>
    ))}
</div>

        </section>

    )
}

export default Productos