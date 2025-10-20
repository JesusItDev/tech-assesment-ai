import { memo } from "react";
import { useChatContexts } from "@/app/customHooks/useChatContext";
import Loading from "./Loading";
import ChatMessageItem from "./ChatMessageItem";
import ChatIncomingMessageItem from "./ChatIncomingMessageItem";

const Conversation = () => {
  const { messageContext, incomingMessageContext, loadingContext } =
    useChatContexts();

  const { messages } = messageContext;
  const { loadingState } = loadingContext;
  const { incomingMessage } = incomingMessageContext;

  return (
    <div className="mt-10 flex flex-col w-full">
      {/* Probably should change index for the message id */}
      {messages.map((message, index) => (
        <ChatMessageItem key={index} message={message} />
      ))}

      {loadingState && <Loading />}
      {!loadingState && incomingMessage && (
        <ChatIncomingMessageItem
          message={{ role: "assistant", content: incomingMessage }}
        />
      )}
    </div>
  );
};

export default memo(Conversation);
