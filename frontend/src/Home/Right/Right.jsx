import React, { useEffect } from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import Type from './Type';
import useConversation from '../../stateMange/useConversation.js';
import { useAuth } from './../../context/AuthProvider.jsx';

export const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // Clear selected conversation when Right component unmounts
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='w-full text-gray-300 bg-slate-950'>
      {!selectedConversation ? (
        <NoChat />
      ) : (
        <>
          <ChatUser />
          <hr />
          <div className='flex-1 overflow-y-auto' style={{ maxHeight: "calc(88vh - 8vh)" }}>
            <Messages />
          </div>
          <Type />
        </>
      )}
    </div>
  );
};

const NoChat = () => {
  const [authUser] = useAuth();
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='font-semibold text-xl'>
        Welcome <span>{authUser?.user?.name}</span>
        <br />
        Select a Conversation to start a Chat
      </h1>
    </div>
  );
};
