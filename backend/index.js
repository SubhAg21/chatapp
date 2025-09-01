import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import cors from "cors"
import router from "./routes/user_routes.js"
import messageRoute from "./routes/message_route.js"
import {app, server} from "./SocketIO/server.js"; 

 
dotenv.config();

app.use(express.json());

app.use(cors()); //enable cors for all request

app.use(cookieParser())

const PORT = process.env.PORT || 5002 
const URI = process.env.MONGODB_URI

try { 
    mongoose.connect(URI);
    console.log("MongoDB Connected");
} catch(error) {
    console.log(error);
}

app.use("/api/user", router);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`)
})
