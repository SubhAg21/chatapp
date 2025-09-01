import React from 'react'
import  useConversation  from '../stateMange/useConversation.js';
import { useSocketContext } from './../context/SocketContext.jsx';

const User = ({user}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const {socket, onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);
  return (
    <>
        <div className={`hover:bg-slate-600 duration-300 ${
            isSelected ? "bg-slate-700" : ""
            }`} onClick={()=>setSelectedConversation(user)}
            >
            <div className='flex space-x-4 px-8 py-7 hover:bg-slate-600 duration-400 cursor-pointer'>
            <div className={`avatar avatar-${isOnline ? "online" :""} `}>
                <div className="w-14 rounded-full">
                    <img src="https://gerold.vercel.app/_next/image?url=%2Fimg%2Fhero%2Fme.png&w=1080&q=75" alt={`${user.name} avatar`} />
                </div>
            </div>
            <div>
                <h1 className='font-bold'>{user.name}</h1>
            <span>{user.email}</span>
            </div>
        </div>
        </div>
    </>
  )
}

export default User