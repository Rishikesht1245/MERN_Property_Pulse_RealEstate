import { useSelector } from "react-redux";
import Chats from "../components/Chats";
import PropertyDetails from "../components/PropertyDetails";
import MessageBox from "../components/MessageBox";
import { useEffect, useRef, useState } from "react";
import {
  getAllConversations,
  getAllMessages,
  getUser,
  sendMessage,
} from "../apiRoutes/userRoutes";
import toast from "react-hot-toast";
import Loading from "../components/subcomponents/Loading";

import { BsFillArrowLeftCircleFill, BsFillSendFill } from "react-icons/bs";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { MdRecentActors } from "react-icons/md";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  // for listings , listing is referenced in conversation
  const { currentUser } = useSelector((state) => state.user);
  const [currentConversation, setCurrentConversation] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  // sender
  const [user, setUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // for scrolling to the latest message
  const scorllRef = useRef();

  const [showChat, setShowChat] = useState(false);

  // collecting data from location passed from sigle listing
  const location = useLocation();

  // opening the conversation if user is navigated from the single listing page
  useEffect(() => {
    setCurrentConversation(location.state);
  }, [location]);

  // socket connection
  const socket = useRef();

  // connection and receiving messages
  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        listingId: data.listingId,
        createdAt: Date.now(),
      });
    });
  }, []);

  // updating messages when there is arrival messages
  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      currentConversation?.listing._id === arrivalMessage.listingId &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);

  // emitting add user to socket
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {});
  }, [currentUser]);

  // fetching sender details for showing name and image
  useEffect(() => {
    // collecting other persons id
    const getUserFromConversation = async () => {
      const friendId = currentConversation?.members?.find(
        (id) => id !== currentUser?._id
      );

      try {
        if (friendId) {
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
        }
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
        const { data } = await getAllConversations(currentUser?._id);
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
        const { data } = await getAllMessages(currentConversation?._id);
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

  // sending messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentConversation?._id,
    };

    const receiverId = currentConversation?.members?.find(
      (member) => member !== currentUser?._id
    );

    // sending message to socket server
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      listingId: currentConversation.listing._id,
      text: newMessage,
    });

    try {
      const { data } = await sendMessage(message);
      if (data.success === false) {
        return toast.error("Something went wrong!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log("error in send message", error);
    }
  };

  // scrolling to the latest message
  useEffect(() => {
    scorllRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-center gap-5 p-2 md:px-5 py-10 h-[calc(100vh-40px)] relative">
      {/* chat left bar */}
      <div className="hidden md:flex w-1/4 flex-col">
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
      {showChat && (
        <div
          className="absolute inset-0 top-10 bg-slate-400  z-10 left-2 flex w-[80%] sm:w-1/3 md:w-1/4 flex-col mb-2 shadow-md duration-400"
          onClick={() => setShowChat((prev) => !prev)}
        >
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
      )}

      {/* chat left bar ends */}
      <div className="flex flex-col w-full sm:w-[60%] border-slate-200 shadow-sm rounded-sm min-h-[calc(100vh-100px)] bg-slate-100">
        {currentConversation ? (
          <div className=" relative border flex flex-col  min-h-[calc(100vh-100px)] bg-slate-100 w-full">
            <div className="flex items-center p-2 text-slate-600 font-semibold cursor-pointer border-b-2 relative">
              <img
                className="h-[40px] w-[40px] rounded-full object-cover mr-4"
                src={`${user?.avatar}`}
                alt="profile image"
              />
              <span className="text-lg">{user?.username}</span>
              <div
                className=" block md:hidden absolute top-3 right-10 sm:right-5 transform translate-x-full sm:transform-none"
                onClick={() => setShowChat((prev) => !prev)}
              >
                <MdRecentActors className=" text-3xl text-slate-700" />
              </div>
            </div>

            <div className="flex flex-col overflow-y-scroll mb-20">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div className="" ref={scorllRef}>
                    <MessageBox
                      message={message}
                      own={message.sender === currentUser._id}
                      currentUser={currentUser}
                      sender={user}
                      key={message?._id}
                    />
                  </div>
                ))
              ) : (
                <span className="text-lg text-semibold text-slate-400 text-center mt-10">
                  Say hi to {user?.username}
                </span>
              )}
            </div>
            {/* send message input box and button */}
            <form
              className="w-[100%] absolute left-2 bottom-2 flex items-center gap-2 px-5"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="border-none outline-none w-[85%] h-[50px] rounded-[50px] p-3 text-slate-700"
                name=""
                value={newMessage}
                id=""
                placeholder="Write something..."
                onChange={(e) => setNewMessage(e.target.value)}
              ></input>
              <button
                type="submit"
                className="bg-gray-700 w-[40px] h-[40px] p-2 rounded-full flex items-center"
              >
                <BsFillSendFill className="text-white text-xl" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-8 items-center w-full h-full justify-center ">
            <span
              className="text-6xl hover:translate-x-[-20px]"
              onClick={() => setShowChat((prev) => !prev)}
            >
              <BsFillArrowLeftCircleFill className="text-blue-400" />
            </span>
            <span className="text-lg text-semibold text-slate-400">
              Open a conversation to start a chat
            </span>
          </div>
        )}
      </div>
      <div className="hidden sm:flex flex-col w-1/3 md:w-1/4 border-slate-200 shadow-sm rounded-sm min-h-[calc(100vh-100px)] bg-slate-100">
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
