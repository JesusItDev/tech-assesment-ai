import { useContext, useEffect, memo } from "react";
import { MessageContext } from "../../context/MessageContext";
import { IncomingMessageContext } from "../../context/IncomingMessageContext";
import { LoadingContext } from "../../context/LoadingContext";
import {
  MessageContextType,
  IncomingMessageContextType,
  LoadingContextType,
} from "../../utils/interfaces";
import Loading from "./Loading";
import ChatMessageItem from "./ChatMessageItem";

const Conversation = () => {
  const messageContext = useContext<MessageContextType | null>(MessageContext);
  const incomingMessageContext = useContext<IncomingMessageContextType | null>(
    IncomingMessageContext
  );
  const loadingContext = useContext<LoadingContextType | null>(LoadingContext);

  // useEffect(() => {
  //   const messageHistory = localStorage.getItem("messages");
  //   const setMessages = messageContext?.setMessages;

  //   if (messageHistory) {
  //     if (!setMessages) return;
  //     setMessages(JSON.parse(messageHistory));
  //   }
  // }, []);

  //Check if context is provided
  if (!messageContext) {
    return <div>Context not provided</div>;
  }

  if (!incomingMessageContext) {
    return <div>Context not provided</div>;
  }

  if (!loadingContext) {
    return <div>Context not provided</div>;
  }

  const { loadingState } = loadingContext || {};
  const { incomingMessage } = incomingMessageContext || {};
  const { messages } = messageContext;

  return (
    <div className="mt-10">
      {messages.map((message, index) => (
        <ChatMessageItem key={index} message={message} />
      ))}

      {loadingState ? (
        <Loading />
      ) : (
        incomingMessage && (
          <ChatMessageItem
            message={{ role: "assistant", content: incomingMessage }}
          />
        )
      )}
    </div>
  );
};

export default memo(Conversation);
