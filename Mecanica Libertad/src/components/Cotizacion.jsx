/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Cotizacion = ({admin}) => {

    const [products, setProducts] = useState([])
    const [modal, setModal] = useState(false)
    const [idEliminate, setIdEliminate]  = useState(0)
    const [loading, setLoading] = useState(false)
    const cotizacionRef = useRef(null)

    const showModal = (id) => {
        setModal(true)
        console.log(id)
        setIdEliminate(id)
    }
    const closeModal = () => setModal(false)
    
    const precioTotal = products.reduce((acc, product) =>
        acc + parseInt(product.precio * product.cantidad), 0)

    useEffect(()=>{
        const storedProduct = JSON.parse(localStorage.getItem('product')) || []
        console.log(storedProduct)


        setProducts(storedProduct)
        console.log(products)
    }, [])

    const handleQuantity = (id, newQuantity) =>{

        setProducts(prevProduct => {

           const updatedProducts = prevProduct.map((product, index)=>
                index === id ? {...product, cantidad:newQuantity} : product
                )

            localStorage.setItem('product', JSON.stringify(updatedProducts))
            return updatedProducts;
        })


    }

    const deleteProduct = (id) =>{

        setLoading(true)
        setTimeout(()=>{
            const updatedProducts = products.filter((_, index) => index !== id)
        
            setProducts(updatedProducts)
            localStorage.setItem("product", JSON.stringify(updatedProducts))
            setModal(false)
            setLoading(false)
        },1000)
        

    }


    const handlePdf = async () =>{
        const elementEliminar = cotizacionRef.current.querySelectorAll('.no-print')
        elementEliminar.forEach(el => el.classList.add('hidden'))
        if (cotizacionRef.current) {
             
            const canvas = await html2canvas(cotizacionRef.current);
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4')
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save('cotizacion.pdf');
        }

        elementEliminar.forEach(el => el.classList.remove('hidden'))
    }

    
  return (
    <>
        <Header user={admin}/>
        <section ref={cotizacionRef} id='productos' className='w-12/12 sm:w-8/12  md:w-6/12 min-h-screen  mx-4 sm:mx-auto pt-24'>
                <div className=' text-center sm:text-left text-3xl sm:text-4xl mb-8'>
                    <div className='inline-flex gap-2 items-center mb-5'>
                        <p className=' text-gray-500'>Cotización de<span className=' text-red-700 font-medium'> Productos</span></p>
                        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-red-700'></p>
                    </div>

                    <div className='flex items-center text-2xl sm:text-3xl'>
                        <h5 className='flex-grow'>Precio total:</h5>
                        <label htmlFor="">${precioTotal.toLocaleString('es-ES')}</label>
                        
                        
                    </div>

                    


                   
                    
                                
                    
                </div>
                
                {
                    products.map((item, id)=>(
                        <div key={id} className='mt-4'>  
                            <div className='flex items-center justify-between border rounded-lg bg-white shadow-md p-4'>
                                <h2 className='text-lg font-semibold text-gray-700 flex-grow'>{item.nombre}</h2>
                                
                                <div className='px-2'>
                                    <p className='text-gray-900 font-semibold'>${(item.precio * item.cantidad).toLocaleString()}</p>
                                </div>

                                <div className='flex items-center px-4'>
                                    <label className='sr-only'>Cantidad</label>
                                    <input className='w-16 p-2 border border-gray rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-red-700' defaultValue={item.cantidad} type="number" min={1} max={200} name="" id="" onChange={e => handleQuantity(id, parseInt(e.target.value) || 1)} />
                                    
                                    
                                </div>

                                <button onClick={()=>showModal(id)} className='no-print p-2 rounded-lg bg-red-200 hover:bg-red-400 hover:text-white '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
</button>

                                

                            </div>
                            
                        </div>
                    ))
                }

                    <div className='flex justify-end my-6'>
                        <button className='no-print py-2 px-4 text-sm rounded-lg bg-red-600 text-white' onClick={handlePdf}>Generar PDF</button>
                    </div>

        </section>

        {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">

                  {
                        loading ? <div className="flex flex-col items-center justify-center h-full w-full mt-4 ">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid"></div>
                        <p className="mt-4 font-semibold text-lg text-gray-700">Eliminando producto...</p>
                         </div>  : <>
                         <button
                      onClick={closeModal}
                      className="absolute top-0 right-3 text-gray-600 hover:text-gray-800 text-3xl p">
                      &times; 
                    </button>
                    <div className="grid grid-col-2 ">
                      <h2 className="text-xl font-semibold mx-auto">¿Seguro de eliminar este producto de la cotización?</h2>
                      
                      <div className="flex justify-between pt-6"> 
                        <button
                          onClick={closeModal}
                          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded">
                          Cancelar
                        </button>
                        <button
                          onClick={()=>deleteProduct(idEliminate)}
                          className="mt-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-2 rounded">
                          Eliminar Producto
                        </button>
                      </div>
                    </div></>
                      }
                    
                </div>
                </div>
              )}
    </>
  )
}

export default Cotizacion