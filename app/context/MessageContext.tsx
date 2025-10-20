"use client";
import { createContext, useState, useEffect } from "react";
import { ChatMessage, MessageContextType } from "../utils/interfaces";
export const MessageContext = createContext<MessageContextType | null>(null);

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const messageHistory = localStorage.getItem("messages");
    if (messageHistory) {
      setMessages(JSON.parse(messageHistory));
    }
  }, []);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
