import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `http://localhost:3001/users?email=${email}&password=${password}`
    );

    if (res.data.length > 0) {
      localStorage.setItem("user", JSON.stringify(res.data[0]));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5e558a] to-purple-300 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">

        {/* Left Side */}
        <div className="bg-[#5e558a] text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-center text-sm opacity-90">
            Sign in to continue accessing your dashboard and manage your account.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-10">
          <h2 className="text-2xl font-bold text-[#5e558a] mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSignin} className="space-y-5">

            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b-2 border-gray-300 focus:border-[#5e558a] outline-none py-2 transition"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b-2 border-gray-300 focus:border-[#5e558a] outline-none py-2 transition"
                placeholder="Enter your password"
              />
            </div>

            <button className="w-full bg-[#5e558a] text-white py-2 rounded-lg hover:scale-105 transition duration-300 shadow-md">
              Sign In
            </button>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#5e558a] font-semibold">
                Signup
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;