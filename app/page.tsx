import ContentContainer from "./components/containers/ContentContainer";
import UserInputContainer from "./components/containers/UserInputContainer";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-bg-dark flex-col">
      <ContentContainer />
      <UserInputContainer />
    </div>
  );
}
