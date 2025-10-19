export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export interface MessageContextType {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}
export interface IncomingMessageContextType {
  incomingMessage: string;
  setIncomingMessage: React.Dispatch<React.SetStateAction<string>>;
}
