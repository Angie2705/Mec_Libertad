import React from 'react'

// eslint-disable-next-line react/prop-types
const Title = ({text1, text2}) => {
  return (
<div className="flex flex-col items-start max-w-fit mx-auto my-5">
  
  <h1 className="text-2xl md:text-5xl pl-4 font-sans font-bold border-l-4 border-red-700 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] relative tracking-[6px] text-gray-500">
    {text1}
    <span className="relative ml-2">
       {text2}

      <div className="absolute right-0 top-full w-1/2 border-b-4 border-red-700 mt-1"></div>
    </span>
  </h1>
</div>

    
  )
}

export default Title