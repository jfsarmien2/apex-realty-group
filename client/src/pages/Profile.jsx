import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.username}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="rounded-lg border border-gray-300 p-3 focus:outline-none bg-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="rounded-lg border border-gray-300 p-3 focus:outline-none bg-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="rounded-lg border border-gray-300 p-3 focus:outline-none bg-white"
          required
        />
        <button className="bg-slate-700 hover:opacity-95 disabled:opacity-80 rounded-lg text-white uppercase p-3">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
