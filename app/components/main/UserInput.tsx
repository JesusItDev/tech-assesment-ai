"use client";
import { useState, memo, useEffect } from "react";
import { useChatContexts } from "@/app/customHooks/useChatContext";
import { IconSend, IconClear } from "@/app/assets/Icons";
import ErrorModal from "../general/ErrorModal";

const UserInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messageContext, incomingMessageContext, loadingContext } =
    useChatContexts();

  const { messages, setMessages } = messageContext;
  const { setIncomingMessage } = incomingMessageContext;
  const { loadingState, setLoadingState } = loadingContext;

  useEffect(() => {
    if (messages.length) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  // const handleSubmit = async (
  //   event?: React.FormEvent | React.KeyboardEvent
  // ) => {
  //   event?.preventDefault();

  //   //Return early if no input or if loading
  //   if (!prompt.trim() || loadingState) return;

  //   setLoadingState(true);

  //   //Add user message and clear input
  //   setMessages((prev) => [...prev, { role: "user", content: prompt }]);
  //   setPrompt("");

  //   try {
  //     const response = await fetch("/api/chat", {
  //       method: "POST",
  //       body: JSON.stringify({ prompt }),
  //     });

  //     if (!response.body) throw new Error("No response body");

  //     const reader = response.body
  //       .pipeThrough(new TextDecoderStream())
  //       .getReader();

  //     let incomingMessage = "";

  //     //Stream response
  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;

  //       incomingMessage += value;
  //       setIncomingMessage(incomingMessage);
  //     }

  //     //Add assistant message
  //     setMessages((prev) => [
  //       ...prev,
  //       { role: "assistant", content: incomingMessage },
  //     ]);

  //     setIncomingMessage("");
  //   } catch (err) {
  //     console.error(err);
  //     setIsModalOpen(true);
  //   } finally {
  //     setLoadingState(false);
  //   }
  // };

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
      setIsModalOpen(true);
      setLoadingState(false);
      console.error(error);
    }
  };
  const handleClear = () => {
    localStorage.removeItem("messages");
    setMessages([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form
      className="flex flex-1 w-5/6 items-center justify-center gap-3 mb-3"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder="Input a prompt..."
        className=" bg-bg-light rounded-xl field-sizing-content max-h-40 w-4/5 p-2 overflow-y-scroll no-scrollbar resize-none"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loadingState}
      />

      <button
        type="submit"
        className={`button-base bg-primary ${
          loadingState ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loadingState}
      >
        <span className="hidden lg:inline">Submit</span>
        <IconSend />
      </button>

      <button
        type="button"
        className={`button-base bg-warning`}
        onClick={handleClear}
      >
        <span className="hidden lg:inline">Clear</span>
        <IconClear />
      </button>

      <ErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>An error has occurred</h3>
        <p>Please try submitting your prompt again.</p>
      </ErrorModal>
    </form>
  );
};

export default memo(UserInput);
