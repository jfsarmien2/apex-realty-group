import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { FaGoogle } from "react-icons/fa";

function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const credentials = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.user.displayName,
          email: credentials.user.email,
          photo: credentials.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data?.user));
      navigate("/");
    } catch (error) {
      console.log("Could not signin with google", error);
    }
  }

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 p-3 rounded-lg text-white cursor-pointer flex items-center justify-center gap-2 uppercase hover:opacity-95"
    >
      <FaGoogle /> <span>Continue with Google</span>
    </button>
  );
}

export default Oauth;
