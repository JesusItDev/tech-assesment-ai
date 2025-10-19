import { useContext, memo } from "react";
import { MessageContext } from "../../context/MessageContext";
import { IncomingMessageContext } from "../../context/IncomingMessageContext";
import {
  MessageContextType,
  IncomingMessageContextType,
} from "../../utils/interfaces";
import ChatMessageItem from "./ChatMessageItem";

const Conversation = () => {
  const messageContext = useContext<MessageContextType | null>(MessageContext);

  const incomingMessageContext = useContext<IncomingMessageContextType | null>(
    IncomingMessageContext
  );

  //Check if context is provided
  if (!messageContext) {
    return <div>Context not provided</div>;
  }

  const { incomingMessage } = incomingMessageContext || {};
  const { messages } = messageContext;
  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessageItem key={index} message={message} />
      ))}

      {incomingMessage && (
        <ChatMessageItem
          message={{ role: "assistant", content: incomingMessage }}
        />
      )}
    </div>
  );
};

export default memo(Conversation);
