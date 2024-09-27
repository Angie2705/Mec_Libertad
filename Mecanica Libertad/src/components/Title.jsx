import React from 'react'

// eslint-disable-next-line react/prop-types
const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-10'>
        <p className='relative'>
            <svg width="200" height="30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 15 C 70 30, 150 0, 200 15" stroke="gray" strokeWidth="2" fill="none" />
            </svg>
        </p>

        <p className='text-red-600 text-4xl font-normal'>{text1} <span className='text-gray-600 font-meidum'>{text2}</span>
        {/* <p className='w-20 h-[2px] bg-gray-700'></p>*/}
        
        </p>
        
        <p className='relative'>
        <svg width="200" height="30" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 15 C 70 0, 150 30, 200 15" stroke="gray" strokeWidth="2" fill="none" />
        </svg>
</p>
        
        
    </div>
    
  )
}

export default Title