import React, { useEffect, useRef } from "react";
import Message from "../../Components/Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../Components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useGetSocketMessage(); // Set up socket listener

  const lastMessageRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) return <Loading />;

  return (
    <>
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages yet. Start chatting!</p>
      ) : (
        messages.map((message, index) => (
          <div
            key={message._id || `${message.senderId}-${index}`} // Fallback key just in case
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))
      )}
      <div style={{ minHeight: "calc(88vh - 10vh)" }}></div>
    </>
  );
};

export default Messages;
