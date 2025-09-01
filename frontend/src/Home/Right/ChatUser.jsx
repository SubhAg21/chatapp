import React from 'react'
import useConversation from '../../stateMange/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

const ChatUser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.some(id => String(id) === String(selectedConversation._id));

  return (
    <div className='pt-5 pl-5 pb-3 flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300 h-[12vh]'>
      <div>
        <div className={`avatar ${isOnline ? 'avatar-online' : 'avatar-offline'}`}>
          <div className='w-14 rounded-full'>
            <img src='https://gerold.vercel.app/_next/image?url=%2Fimg%2Fhero%2Fme.png&w=1080&q=75' alt="User avatar"/>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-lg'>{selectedConversation.name}</h1>
        <span className='text-sm'>{isOnline ? 'Online' : 'Offline'}</span>
      </div>
    </div>
  );
};

export default ChatUser;
