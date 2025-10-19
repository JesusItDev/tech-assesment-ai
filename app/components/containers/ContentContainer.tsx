import WelcomeMessage from "../main/WelcomeMessage";
import Conversation from "../main/Conversation";
import { useContext } from "react";
import { MessageContext } from "../../context/MessageContext";
import { MessageContextType } from "../../utils/interfaces";
import { memo } from "react";

const ContentContainer = () => {
  const messageContext = useContext<MessageContextType | null>(MessageContext);

  //Check if context is provided
  if (!messageContext) {
    return <div>Context not provided</div>;
  }

  return (
    <div className="flex-9 w-5/6">
      {messageContext.messages.length === 0 && <WelcomeMessage />}

      <Conversation />
    </div>
  );
};

export default memo(ContentContainer);
