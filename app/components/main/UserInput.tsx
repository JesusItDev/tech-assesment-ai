"use client";
import { useState, memo } from "react";
import { useContext } from "react";
import { MessageContext } from "../../context/MessageContext";
import { IncomingMessageContext } from "../../context/IncomingMessageContext";
import {
  MessageContextType,
  IncomingMessageContextType,
} from "../../utils/interfaces";

const UserInput = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messageContext = useContext<MessageContextType | null>(MessageContext);

  const incomingMessageContext = useContext<IncomingMessageContextType | null>(
    IncomingMessageContext
  );

  //Check if context is provided
  if (!messageContext) {
    return <div>Context not provided</div>;
  }

  if (!incomingMessageContext) {
    return <div>Context not provided</div>;
  }

  const { setMessages } = messageContext;
  const { setIncomingMessage } = incomingMessageContext || {};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: prompt },
    ]);

    setPrompt("");
    const response = await fetch("../../api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    if (!response.body) return;

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    if (reader) setIsLoading(false);

    let incomingMessage = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        setMessages((prevState) => [
          ...prevState,
          { role: "assistant", content: incomingMessage },
        ]);

        setIncomingMessage("");

        break;
      }

      if (value) {
        incomingMessage += value;

        setIncomingMessage(incomingMessage);
      }
    }
  };

  return (
    <form
      className="flex flex-1 w-5/6 items-center justify-center gap-3 mb-3"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder="Input a prompt..."
        className="bg-bg-light rounded-xl field-sizing-content max-h-40 w-4/5 p-2 overflow-y-scroll no-scrollbar "
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="p-2 bg-primary w-1/12 rounded-xl"
        type="submit"
        disabled={isLoading}
      >
        Submit
      </button>
      <button className="p-2 bg-warning w-1/12 rounded-xl">Clear</button>
    </form>
  );
};

export default memo(UserInput);
