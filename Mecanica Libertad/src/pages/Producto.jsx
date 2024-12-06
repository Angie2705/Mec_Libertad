import React from 'react'
import Header from '../components/Header'
import Productos from '../components/Productos'
import Whatsapp from '../components/Whatsapp'
import ChatBotDialogFlow from '../components/ChatBotDialogFlow'

const Producto = ({admin}) => {
  return (
    <>
    <Header user={admin}/>
    <div className='mt-24'>
      <Productos admin={admin}/>
    </div>
    
    <Whatsapp />
    <ChatBotDialogFlow/>
    </>
  )
}

export default Producto