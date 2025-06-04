import { FaGoogle } from "react-icons/fa";

function Oauth() {
  async function handleGoogleClick() {
    try {
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
