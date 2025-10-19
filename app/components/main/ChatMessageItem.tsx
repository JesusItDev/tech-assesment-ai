import { memo } from "react";
import { ChatMessage } from "../../utils/interfaces";

const ChatMessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <div>
      <h3>{message.role}</h3>
      <p>{message.content}</p>
    </div>
  );
};

export default memo(ChatMessageItem);
