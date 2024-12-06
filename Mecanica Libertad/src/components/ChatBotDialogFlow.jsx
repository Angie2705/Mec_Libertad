import React, { useState } from 'react'
import { assets } from '../assets/assets';

const ChatBotDialogFlow = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatbot = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        {/* Ícono flotante */}
        <button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 z-40"
        >
          <img src={assets.botImage} className='w-9 h-9' alt="" />
        </button>
  
        
        {isOpen && (
          <div className="z-20 fixed bottom-32 right-12 w-80 h-96 ">

            {/* Iframe del chatbot */}
            <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/c48e1be7-8cde-4db5-a914-431c06f1e20f"></iframe>
          </div>
        )}
      </div>
    );
}

export default ChatBotDialogFlow