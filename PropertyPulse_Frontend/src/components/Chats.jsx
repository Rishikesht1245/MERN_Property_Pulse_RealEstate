import { useEffect, useState } from "react";
import { getUser } from "../apiRoutes/userRoutes";

const Chats = ({ conversation, currentUser, onClick }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // collecting other persons id
    const getUserFromConversation = async () => {
      const friendId = conversation.members.find(
        (id) => id !== currentUser._id
      );
      const { data } = await getUser(friendId);
      setUser(data);
    };
    getUserFromConversation();
  }, [currentUser?._id]);
  return user ? (
    <div
      onClick={() => onClick(conversation)}
      className="flex items-center p-2 text-slate-600 font-semibold cursor-pointer hover:bg-gray-200 mt-2"
    >
      <img
        className="h-[40px] w-[40px] rounded-full object-cover mr-4"
        src={`${user?.avatar}`}
        alt="profile image"
      />
      <span className="text-sm">{user?.username}</span>
    </div>
  ) : (
    <p className="text-sm font-semibold text-slate-700 p-3 mt-5 text-center">
      No chats to show
    </p>
  );
};
export default Chats;
