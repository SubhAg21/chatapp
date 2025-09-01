import React, { useEffect, useState } from "react";
import useConversation from "../stateMange/useConversation.js";
import axios from "axios";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );

          setMessages(response.data.messages);
          // console.log("Response from API:", response.data);
          setLoading(false);
        } catch (error) {
          console.log("Errro in useGetMessage", error);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);
  return {
    messages,
    loading
  };
}

export default useGetMessage;
