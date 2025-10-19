"use client";
import ContentContainer from "./components/containers/ContentContainer";
import UserInputContainer from "./components/containers/UserInputContainer";
import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  return (
    <div className="flex justify-center items-center h-screen bg-bg-dark flex-col">
      <ContentContainer messages={messages} />
      <UserInputContainer setMessages={setMessages} />
    </div>
  );
}
