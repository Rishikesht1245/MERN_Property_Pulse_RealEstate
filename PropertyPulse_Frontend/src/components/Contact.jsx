import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [message, setMessage] = useState("");

  const handleTextArea = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {listing?.userRef && (
        <div className="my-5 flex flex-col gap-5">
          <p className="text-slate-700 ">
            Contact{" "}
            <span className="font-semibold">{listing?.userRef?.username}</span>{" "}
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={handleTextArea}
            placeholder="Enter your message here..."
            className="w-full border p-3 focus:border-slate-400 focus:outline-none rounded-lg shadow-sm"
          ></textarea>
          <Link
            to={`mailto:${listing.userRef.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white uppercase hover:opacity-95 text-center font-semibold rounded-lg p-3"
          >
            Send Email
          </Link>
        </div>
      )}
    </>
  );
};
export default Contact;
