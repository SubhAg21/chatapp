import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"],
  },
});

//real time message
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId]
}

// users object: userId => array of socketIds
const users = {};

io.on("connection", (socket) => {
  console.log("New Client Connected:", socket.id);

  const userId = socket.handshake.auth?.userId || socket.handshake.query?.userId;

  if (userId) {
    // Agar user pehle se connected hai to naye socketId ko add karo, nahi to naya array banao
    if (users[userId]) {
      users[userId].push(socket.id);
    } else {
      users[userId] = [socket.id];
    }
    console.log("Users after connection:", users);

    // Sabko updated online user list bhejo
    io.emit("getonline", Object.keys(users));
  }

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected: ${socket.id} Reason: ${reason}`);

    // Disconnect hone wale socketId ko users list se hatao
    for (const [userId, socketIds] of Object.entries(users)) {
      const index = socketIds.indexOf(socket.id);
      if (index !== -1) {
        socketIds.splice(index, 1);
        if (socketIds.length === 0) {
          delete users[userId];
          console.log(`Removed userId ${userId} from users list`);
        }
        break;
      }
    }
    console.log("Users after disconnect:", users);

    // Updated online users sab clients ko bhejo
    io.emit("getonline", Object.keys(users));
  });
});

export { app, io, server };


