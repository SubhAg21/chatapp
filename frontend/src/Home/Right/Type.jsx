import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import useSendMessage from './../../context/useSendMessage.js';

const Type = () => {
  const {loading, sendMessages} = useSendMessage();
  const [message, setMessage] =useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
              <div className='flex h-[8vh] bg-gray-800'>
        <div className='w-[70%] mx-4'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type here'
            className='border-[1px] border-gray-700 rounded-xl flex items-center py-3 px-3
             w-full grow outline-none bg-slate-900 mt-1'
          />
        </div>
        <button className='text-3xl'>
          <IoSend className='mr-2' />
        </button>
      </div>
      </form>
    </>
  )
}

export default Type
