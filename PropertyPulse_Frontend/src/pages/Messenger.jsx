import { useSelector } from "react-redux";
import Chats from "../components/Chats";
import PropertyDetails from "../components/PropertyDetails";
import MessageBox from "../components/MessageBox";
import { useEffect, useState } from "react";
import {
  getAllConversations,
  getAllMessages,
  getUser,
} from "../apiRoutes/userRoutes";
import toast from "react-hot-toast";
import Loading from "../components/subcomponents/Loading";

import { BsFillArrowLeftCircleFill, BsFillSendFill } from "react-icons/bs";
import { FaEnvelopeOpenText } from "react-icons/fa";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  // for listings , listing is referenced in conversation
  const { currentUser } = useSelector((state) => state.user);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  // sender
  const [user, setUser] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  // fetching sender details for showing name and image
  useEffect(() => {
    // collecting other persons id
    const getUserFromConversation = async () => {
      const friendId = currentConversation.members.find(
        (id) => id !== currentUser._id
      );

      try {
        const { data } = await getUser(friendId);
        if (data.success === false) {
          return toast.error("Something went wrong!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
        setUser(data);
      } catch (error) {
        console.log("error in get user ", error);
      }
    };
    getUserFromConversation();
  }, [currentConversation]);

  // fetching all conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const { data } = await getAllConversations(currentUser._id);
        if (data.success === false) {
          return toast.error("Something went wrong!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
        setConversations(data);
        setLoading(false);
      } catch (error) {
        console.log("error in get conversations : ", error);
      }
    };

    getConversations();
  }, [currentUser._id]);

  const handleChatClick = (conversation) => {
    setCurrentConversation(conversation);
  };

  //fetching chats based on conversations
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await getAllMessages(currentConversation._id);
        if (data.success === false) {
          return toast.error("Something went wrong!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
        setMessages(data);
      } catch (error) {
        console.log("error in get messages", error);
      }
    };

    getMessages();
  }, [currentConversation]);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-center gap-5 p-10 h-[calc(100vh-40px)]">
      {/* chat left bar */}
      <div className="flex w-1/4 flex-col">
        <div className="border flex flex-col border-slate-200 shadow-sm rounded-sm min-h-[calc(100vh-100px)] bg-slate-100 py-2">
          <h3 className="font-semibold text-slate-700 border-b-2 p-2  text-lg">
            Recent Chats
          </h3>
          <div className="flex flex-col overflow-y-scroll">
            {conversations.map((conversation) => (
              <Chats
                key={conversation._id}
                conversation={conversation}
                currentUser={currentUser && currentUser}
                onClick={handleChatClick}
              />
            ))}
          </div>
        </div>
      </div>
      {/* chat left bar ends */}
      <div className="flex flex-col w-1/2 border-slate-200 shadow-sm rounded-sm min-h-[calc(100vh-100px)] bg-slate-100">
        {currentConversation ? (
          <div className=" relative border flex flex-col  min-h-[calc(100vh-100px)] bg-slate-100 w-full">
            <div className="flex items-center p-2 text-slate-600 font-semibold cursor-pointer border-b-2">
              <img
                className="h-[40px] w-[40px] rounded-full object-cover mr-4"
                src={`${user?.avatar}`}
                alt="profile image"
              />
              <span className="text-lg">{user?.username}</span>
            </div>

            <div className="flex flex-col overflow-y-scroll mb-20">
              {messages.map((message) => (
                <MessageBox
                  message={message}
                  own={message.sender === currentUser._id}
                  currentUser={currentUser}
                  sender={user}
                />
              ))}
            </div>
            {/* send message input box and button */}
            <div className="w-[100%] absolute left-2 bottom-2 flex items-center gap-5">
              <input
                type="text"
                className="border-none outline-none w-[85%] h-[50px] rounded-[50px] p-3 text-slate-700"
                name=""
                id=""
                placeholder="Write something..."
              ></input>
              <button className="bg-gray-700 w-[40px] h-[40px] p-2 rounded-full flex items-center">
                <BsFillSendFill className="text-white text-xl" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 items-center w-full h-full justify-center ">
            <span className="text-6xl hover:translate-x-[-20px]">
              <BsFillArrowLeftCircleFill className="text-blue-400" />
            </span>
            <span className="text-lg text-semibold text-slate-400">
              Open a conversation to start a chat
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col w-1/4 border-slate-200 shadow-sm rounded-sm min-h-[calc(100vh-100px)] bg-slate-100">
        <div className="border flex flex-col border-slate-200 shadow-sm rounded-sm min-h-[calc(100vh-100px)] bg-slate-100 py-2">
          <h3 className="font-semibold text-slate-700 border-b-2 p-2  text-lg">
            Property Details
          </h3>
          {currentConversation ? (
            <PropertyDetails listing={currentConversation.listing} />
          ) : (
            <div className="flex flex-col gap-8 items-center w-full h-full justify-center ">
              <span className="text-6xl hover:translate-x-7">
                {" "}
                <FaEnvelopeOpenText className="text-green-400" />
              </span>
              <span className="text-[16px] text-semibold text-slate-400">
                Open a conversation to see details
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Messenger;
