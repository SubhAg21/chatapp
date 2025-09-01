import React from 'react'

const Message = ({message}) => {
  const authUser = JSON.parse(localStorage.getItem("messenger"))
  const itsme = message.senderId === authUser.user._id;
  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme ? "bg-red-400":"";
  const createdAt = new Date(message.createdAt);
  const formattedTime  = createdAt.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })
  return (
    <>
      <div className='p-5'>
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-black ${chatColor} rounded-full`}>
            {message.message}
          </div>
          <div>{formattedTime}</div>
        </div>
      </div>
    </>
  )
}

export default Message
