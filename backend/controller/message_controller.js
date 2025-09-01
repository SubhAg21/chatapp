import Conversation from './../models/conversation_model.js';
import Message from './../models/message_model.js';


import { getReceiverSocketId, io } from './../SocketIO/server.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        conversation.messages.push(newMessage._id);
        await Promise.all([conversation.save(), newMessage.save()]);

        // Emit to receiver
        const receiverSocketIds = getReceiverSocketId(receiverId);
        if (receiverSocketIds) {
            receiverSocketIds.forEach(socketId => {
                io.to(socketId).emit("newMessage", newMessage);
            });
        }

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.log("error in sending message: " + error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// export const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         const receiverId = req.params.id;
//         const senderId = req.user._id;

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId],
//             });
//         }

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message,
//         });

//         conversation.messages.push(newMessage._id);
//         await Promise.all([conversation.save(), newMessage.save()]);

//         res.status(201).json({ message: "Message sent successfully", newMessage });

//     } catch (error) {
//         console.log("error in sending message: " + error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatUser] }
        }).populate("messages");

        if (!conversation) {
          return res.status(200).json({ messages: [] });
        }


        res.status(201).json({ messages: conversation.messages });

    } catch (error) {
        console.log("error in getting message: " + error);
        res.status(500).json({ message: "Internal server error" });
    }
};
