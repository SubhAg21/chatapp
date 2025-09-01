import React, { useState } from "react";
import useConversation from './../stateMange/useConversation.js';
import axios from "axios";

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessages = async (message) => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.post(
            `/api/message/send/${selectedConversation._id}`,{message}
          );

          setMessages([...messages, response.data.newMessage]);

          setLoading(false);
        } catch (error) {
          console.log("Errro in send Message", error);
        }
      }
    };
    return {loading, sendMessages, messages};
}

export default useSendMessage;