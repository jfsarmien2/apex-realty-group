import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 p-3 text-white rounded-lg cursor-pointer hover:opacity-95 disabled:opacity-80">
          Signup
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
