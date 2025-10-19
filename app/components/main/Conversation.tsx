import React from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const Conversation = ({ messages }: { messages: ChatMessage[] }) => {
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
