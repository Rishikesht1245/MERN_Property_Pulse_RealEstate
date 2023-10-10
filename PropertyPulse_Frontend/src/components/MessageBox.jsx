import { format } from "timeago.js";

const MessageBox = ({ message, own, currentUser, sender }) => {
  const alignmentClass = own ? "self-end" : "self-start";
  const messageAlignment = own ? "text-right" : "text-left ml-5";
  return (
    <div className={`flex-col ${alignmentClass} w-[50%]`}>
      <div
        className={`flex items-center gap-2  p-3 mt-5 text-white rounded-lg ml-5 ${
          own ? "ml-auto bg-gray-700" : "mr-auto  bg-blue-500"
        }`}
      >
        <img
          className="h-[40px] w-[40px] rounded-full object-cover mr-4"
          src={`${own ? currentUser?.avatar : sender.avatar}`}
          alt=""
        />
        <p className="text-sm font-semibold tracking-wider">{message.text}</p>
      </div>
      <span
        className={`mt-2 text-xs font-semibold text-slate-600 ${messageAlignment}`}
      >
        {format(message.createdAt, "en_US")}
      </span>
    </div>
  );
};
export default MessageBox;
