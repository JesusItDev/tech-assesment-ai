import WelcomeMessage from "../main/WelcomeMessage";
import Conversation from "../main/Conversation";

const ContentContainer = () => {
  const conversation = false;

  return (
    <div className="flex-9 w-5/6">
      {!conversation ? <WelcomeMessage /> : <Conversation />}
    </div>
  );
};

export default ContentContainer;
