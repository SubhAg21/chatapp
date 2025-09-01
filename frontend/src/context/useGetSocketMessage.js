import useConversation from "../stateMange/useConversation.js";
import { useSocketContext } from "./SocketContext.jsx";
import { useEffect } from "react";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Manually append to existing messages
      setMessages([...messages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, setMessages]);
};

export default useGetSocketMessage;
