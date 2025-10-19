import WelcomeMessage from "../main/WelcomeMessage";
import Conversation from "../main/Conversation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const ContentContainer = ({ messages }: { messages: ChatMessage[] }) => {
  return (
    <div className="flex-9 w-5/6">
      <WelcomeMessage />

      <Conversation messages={messages} />
    </div>
  );
};

export default ContentContainer;
