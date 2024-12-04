import React, { useEffect, useState } from 'react';
import Title from './Title';
import { assets } from '../assets/assets';
import ImagenServicios from './ImagenServicios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Servicios() {

  const Imserv = [assets.service1, assets.service2, assets.service3, assets.service4,
    assets.service5, assets.service6, assets.service7, assets.service8]  

  let [serviceArray, setServiceArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const dbRef = collection(db, "servicios")
        const snapShot = await getDocs(dbRef)

        if (!snapShot.empty) {

          const temporaryArray = snapShot.docs.map((doc) => ({
            ...doc.data(),
            serviceId: doc.id,
          }));

          setServiceArray(temporaryArray);

        } else {
          console.log("No hay datos")
        }

      } catch (error) {
        console.error("Error fetching data", error)
      }

    };
    console.log(serviceArray)

    fetchData();
  }, [db])

  return (
    <section id="servicios" className="h-fit items-center justify-center text-center pb-5 mt-10 ">
      <div>
        <Title text1={"Nuestros"} text2={"Servicios"} />

        <div className='h-full grid grid-cols-2 gap-1 pt-6'>
          {serviceArray.map((servicios, index) => (
            <ImagenServicios key={index} img={Imserv[index]} titulo={servicios.nombre} descripcion={servicios.descripcion} />
          ))}
        </div>

      </div>
    </section>
  );
}
  
export default Servicios;

/*<div className="relative text-center w-1/2 mx-auto py-2 bg-gradient-to-r from-red-500 to-gray-800 rounded-lg shadow-lg">
          <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-md">
            Nuestros servicios
          </h1>
          <div className="absolute inset-0 bg-opacity-50 bg-black rounded-lg hover:bg-opacity-0 transition duration-500"></div>
        </div>
*/