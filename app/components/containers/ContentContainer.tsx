import WelcomeMessage from "../main/WelcomeMessage";
import Conversation from "../main/Conversation";

const ContentContainer = () => {
  return (
    <div className="flex-9 w-5/6">
      <WelcomeMessage />

      <Conversation />
    </div>
  );
};

export default ContentContainer;
