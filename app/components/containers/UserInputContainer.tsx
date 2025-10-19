import UserInput from "../main/UserInput";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const UserInputContainer = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) => {
  return (
    <div className="flex flex-1 w-5/6 items-center justify-center gap-3 mb-3">
      <UserInput setMessages={setMessages} />
    </div>
  );
};

export default UserInputContainer;
