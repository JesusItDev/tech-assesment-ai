"use client";
import WelcomeMessage from "../main/WelcomeMessage";
import Conversation from "../main/Conversation";
import { memo, useContext } from "react";
import { MessageContext } from "../../context/MessageContext";
import Loading from "../main/Loading";

const ContentContainer = () => {
  const messageContext = useContext(MessageContext);

  if (!messageContext) {
    return <div>Context not provided</div>;
  }

  const { hydrated, messages } = messageContext;

  if (!hydrated) {
    return (
      <div className="flex-9 w-5/6 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-9 w-5/6 max-h-9/10 overflow-y-scroll no-scrollbar">
      {hydrated && messages.length > 0 ? <Conversation /> : <WelcomeMessage />}
    </div>
  );
};

export default memo(ContentContainer);
