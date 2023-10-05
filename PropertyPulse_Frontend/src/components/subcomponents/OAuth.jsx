import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { googleOAuth } from "../../apiRoutes/userRoutes";
import { useDispatch } from "react-redux";
import { singInSuccess } from "../../redux/user/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { displayName: username, email, photoURL: photo } = result.user;

      const { data } = await googleOAuth({ username, email, photo });
      dispatch(singInSuccess(data));
      toast.success("Successful!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="text-sm sm:text-md bg-red-700 text-white rounded-lg p-3 uppercase tracking-wider hover:opacity-95"
    >
      Continue with google
    </button>
  );
};
export default OAuth;
