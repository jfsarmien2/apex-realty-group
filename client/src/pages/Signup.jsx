import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data?.success) {
        setError(data?.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="border border-gray-300 focus:outline-none p-3 rounded-lg bg-white"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border border-gray-300 focus:outline-none p-3 rounded-lg bg-white"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border border-gray-300 focus:outline-none p-3 rounded-lg bg-white"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg cursor-pointer hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
    </div>
  );
}

export default Signup;
