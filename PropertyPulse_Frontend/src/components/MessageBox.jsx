import { format } from "timeago.js";

const MessageBox = ({ message, own, currentUser, sender }) => {
  const messageAlignment = own
    ? "flex-row-reverse text-right"
    : "flex-row text-left";
  const messageContainerClass = own
    ? "ml-auto bg-gray-700"
    : "mr-auto bg-blue-500";

  return (
    <div className={`flex ${messageAlignment} w-[100%] px-3`}>
      <div
        className={`flex items-center gap-2 p-1 sm:p-3 mt-5 text-white rounded-lg ${messageContainerClass}`}
      >
        <img
          className="h-[40px] w-[40px] rounded-full object-cover mr-4"
          src={`${own ? currentUser?.avatar : sender.avatar}`}
          alt=""
        />
        <p className="text-sm font-semibold tracking-wider text-left">
          {message.text}
        </p>
        <span
          className={`mt-7 text-xs font-semibold text-slate-400 ${
            own ? "ml-5" : "mr-5"
          }`}
        >
          {format(message.createdAt, "en_US")}
        </span>
      </div>
    </div>
  );
};

export default MessageBox;
