import Chats from "../components/Chats";
import PropertyDetails from "../components/PropertyDetails";
import MessageBox from "./MessageBox";

const Messenger = () => {
  return (
    <div className="flex justify-center gap-5 p-10 h-[calc(100vh-40px)]">
      <div className="flex w-1/4 flex-col">
        <Chats />
      </div>
      <div className="flex flex-col w-1/2">
        {" "}
        <MessageBox />
      </div>
      <div className="flex flex-col w-1/4">
        <PropertyDetails />
      </div>
    </div>
  );
};
export default Messenger;
