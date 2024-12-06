import React, { useEffect, useState } from 'react';
import Title from './Title';
import { assets } from '../assets/assets';
import ImagenServicios from './ImagenServicios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Servicios() {
  //Imagenes de los servicios.
  const Imserv = [assets.service1, assets.service2, assets.service3, assets.service4,
  assets.service5, assets.service6, assets.service7, assets.service8]

  let [serviceArray, setServiceArray] = useState([]);
  
  // Conexión a base de datos y llamado de datos se servicios.
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
        
        {/* Genera un contenedor por cada servicio */}
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