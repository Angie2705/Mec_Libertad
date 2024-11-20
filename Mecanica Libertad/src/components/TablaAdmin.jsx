import React, { useEffect, useState } from 'react';
import Header from './Header'
import { get, ref } from 'firebase/database';
import { db} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDoc, getDocs } from 'firebase/firestore';

function TablaAdmin({ admin }) {

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
                    console.log("No hay datos")
                }

            } catch (error) {
                console.error("Error fetching data", error)
            }

        };
        console.log(productArray)

        fetchData();
    }, [db])

    return (
        <>
            <Header user={admin} />
            <div className='text-center sm:text-left sm:text-3xl mt-24 ml-24 mx-auto'>
                <div className='inline-flex gap-2 items-center mb-3'>
                    <p className=' text-gray-500'>Nuestros <span className=' text-red-700 font-medium'>Productos</span></p>
                    <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-red-700'></p>
                </div>
            </div>

            <div className='flex flex-col items-end px-5 md:px-20'>
                <button onClick={() => navigate(`/Agregarprod`)} className='w-44 px-4 py-3 mb-5 text-base rounded-lg bg-red-600 text-white hover:bg-red-700'> Nuevo Producto</button>

                <table className=' w-full' id="">
                    <thead>
                        <tr className='bg-red-700 text-white text-lg h-12'>
                            <th scope="col" className='border-2 border-black w-52'>Id</th>
                            <th scope="col" className='border-2 border-black w-52'>Nombre</th>
                            <th scope="col" className='border-2 border-black w-52'>Precio</th>
                            <th scope="col" className='border-2 border-black'>Descripción</th>

                        </tr>
                    </thead>

                    <tbody>
                        {productArray.map(item => (
                            <tr key={item.id} className='hover:bg-gray-200 text-sm text-center'>
                                <td className='border-2 border-black'>{item.productId}</td>
                                <td className='border-2 border-black'>{item.nombre}</td>
                                <td className='border-2 border-black'>{item.precio}</td>
                                <td className='border-2 border-black'>{item.descripcion}</td>
                                <td className='w-20 rounded-r-full'>
                                    <button onClick={() => navigate(`/productoAdmin/${item.productId}`)}
                                        className='px-3 py-3 m-2 text-md rounded-full bg-gray-600 text-white hover:bg-black'>Modificar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default TablaAdmin;
//<ProductItem key={index} image={key.imagen} name={key.nombre} price={key.precio} desc={key.desc} admin={admin}  />
//onClick={()=> navigate(`/producto`)}