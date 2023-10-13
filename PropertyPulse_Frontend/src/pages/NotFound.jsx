import { Link } from "react-router-dom";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://res.cloudinary.com/djcn6luvw/image/upload/v1696846031/pexels-tom-fisk-2292073_jgsncg.jpg")`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col bg-[top_right_-20rem] md:bg-center bg-fixed"
    >
      <div className="flex justify-center items-center grow">
        <div className="bg-slate-200 rounded-lg w-[90%] sm:w-[50%] py-5 flex flex-col justify-center items-center">
          <img
            className="max-w-[200px] w-full mx-auto mt-10"
            src={
              "https://res.cloudinary.com/djcn6luvw/image/upload/v1696846675/404-error_cddqa5_schnvr.png"
            }
            alt="something went wrong"
          />
          <h2 className="mt-10 text-lg">Oops! Page not found...</h2>
          <Link
            className="font-bold text-primary mx-auto my-5 hover:scale-105 transition-scale duration-300"
            to={"/"}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
