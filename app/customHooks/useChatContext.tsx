import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { IncomingMessageContext } from "../context/IncomingMessageContext";
import { LoadingContext } from "../context/LoadingContext";
import {
  MessageContextType,
  IncomingMessageContextType,
  LoadingContextType,
} from "../utils/interfaces";
import ErrorModal from "../components/main/ErrorModal";

export const useChatContexts = (): {
  messageContext: MessageContextType;
  incomingMessageContext: IncomingMessageContextType;
  loadingContext: LoadingContextType;
} => {
  const messageContext = useContext<MessageContextType | null>(MessageContext);
  const incomingMessageContext = useContext<IncomingMessageContextType | null>(
    IncomingMessageContext
  );
  const loadingContext = useContext<LoadingContextType | null>(LoadingContext);

  //Check if context is provided
  if (!messageContext || !incomingMessageContext || !loadingContext) {
    //@ts-expect-error This returns a Error modal
    return <ErrorModal />;
  }

  return { messageContext, incomingMessageContext, loadingContext };
};
