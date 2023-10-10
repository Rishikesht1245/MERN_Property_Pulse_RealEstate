import {
  questionsArray,
  questionsArray1,
  questionsArray2,
} from "../constants/footerLinks";

import { FaSquareXTwitter } from "react-icons/fa6";
import { GrInstagram, GrYoutube, GrFacebook } from "react-icons/gr";

export const Footer = () => {
  return (
    <footer className="bg-slate-100 border-t font-semibold text-slate-700 flex p-10 flex-wrap md:gap-[150px] gap-10">
      <div className="flex flex-col">
        {questionsArray.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="text-[14px] p-2 hover:text-black"
          >
            {item.content}
          </a>
        ))}
      </div>
      <div className="flex flex-col">
        {questionsArray1.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="text-[14px] p-2 hover:text-black"
          >
            {item.content}
          </a>
        ))}
      </div>
      <div className="flex flex-col">
        {questionsArray2.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="text-[14px] p-2 hover:text-black"
          >
            {item.content}
          </a>
        ))}
      </div>
      <div>
        <div className="flex gap-5">
          <GrFacebook className="text-[24px]" />
          <GrInstagram className="text-[24px]" />
          <FaSquareXTwitter className="text-[24px]" />
          <GrYoutube className="text-[24px]" />
        </div>
        <div className="flex flex-col mt-5">
          <p className=" text-xs">
            &copy; {new Date().getFullYear()} PropertyPulse. All Rights
            Reserved.
          </p>
          <p className="my-5 text-sm  font-semibold text-slate-600 hover:text-blue-500">
            Made by{" "}
            <a href="https://rishikeshportfolio1245.netlify.app/">
              Rishikesh T
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
