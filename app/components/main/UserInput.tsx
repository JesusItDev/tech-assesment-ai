"use client";
import { useState, memo } from "react";
import { useContext } from "react";
import { MessageContext } from "../../context/MessageContext";
import { IncomingMessageContext } from "../../context/IncomingMessageContext";
import { LoadingContext } from "../../context/LoadingContext";
import {
  MessageContextType,
  IncomingMessageContextType,
  LoadingContextType,
} from "../../utils/interfaces";
import ErrorModal from "./ErrorModal";

const UserInput = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [prompt, setPrompt] = useState<string>("");

  const messageContext = useContext<MessageContextType | null>(MessageContext);
  const incomingMessageContext = useContext<IncomingMessageContextType | null>(
    IncomingMessageContext
  );
  const loadingContext = useContext<LoadingContextType | null>(LoadingContext);

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

  const { setMessages } = messageContext;
  const { setIncomingMessage } = incomingMessageContext || {};
  const { loadingState, setLoadingState } = loadingContext || {};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (prompt.trim() === "") return;

    setLoadingState(true);

    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: prompt },
    ]);

    setPrompt("");

    try {
      const response = await fetch("../../api/chat", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (!response.body) return;

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      if (reader) setLoadingState(false);

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
    } catch (error) {
      console.error(error);
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
        className={`p-2 bg-primary w-1/12 rounded-xl ${loadingState && "opacity-50"} `}
        type="submit"
        disabled={loadingState}
      >
        Submit
      </button>
      <button
        className="p-2 bg-warning w-1/12 rounded-xl"
        onClick={() => setIsModalOpen(true)}
      >
        Clear
      </button>
      <ErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>An error as occurred</h3>
        <p>Plese try to re enter your prompt.</p>
      </ErrorModal>
    </form>
  );
};

export default memo(UserInput);
