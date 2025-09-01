import React, { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthProvider.jsx";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (!authUser) return;

    const newSocket = io("http://localhost:5000", {
      auth: { userId: authUser.user._id },
    });

    setSocket(newSocket);

    newSocket.on("getonline", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
