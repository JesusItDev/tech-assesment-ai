// Context.js
import { createContext, useState } from "react";
import { ChatMessage, MessageContextType } from "../utils/interfaces";
export const MessageContext = createContext<MessageContextType | null>(null);

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
