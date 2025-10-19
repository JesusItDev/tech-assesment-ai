// Context.js
import { createContext, useState } from "react";
import { IncomingMessageContextType } from "../utils/interfaces";
export const IncomingMessageContext =
  createContext<IncomingMessageContextType | null>(null);

const IncomingMessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [incomingMessage, setIncomingMessage] = useState<string>("");

  return (
    <IncomingMessageContext.Provider
      value={{ incomingMessage, setIncomingMessage }}
    >
      {children}
    </IncomingMessageContext.Provider>
  );
};

export default IncomingMessageProvider;
