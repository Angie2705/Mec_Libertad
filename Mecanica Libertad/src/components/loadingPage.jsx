import React from 'react'

const loadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-1/2 w-1/2 mt-4">
                    <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-red-500 border-solid"></div>
                    <p className="mt-4 text-lg text-gray-700">Cargando...</p>
    </div>
  )
}

export default loadingPage