import { useContext } from "react";
import { MessageContext } from "../../context/MessageContext";
import { MessageContextType } from "../../utils/interfaces";

const Conversation = () => {
  const messageContext = useContext<MessageContextType | null>(MessageContext);

  //Check if context is provided
  if (!messageContext) {
    return <div>Context not provided</div>;
  }

  const { messages } = messageContext;
  console.log("current MEssages: ", messages);
  return (
    <div>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index}>
            <h3>{message.role === "user" ? "User: " : "AI: "}</h3>
            <p>{message.content}</p>
          </div>
        ))
      ) : (
        <div>No messages</div>
      )}
    </div>
  );
};

export default Conversation;
