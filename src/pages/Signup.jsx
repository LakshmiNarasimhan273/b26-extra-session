import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const apiUrl = "http://localhost:3001/users"

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const navigate = useNavigate();

  // User Registration Logic
  const handleSignup = async (e) => {
    e.preventDefault();

    // logic - 1
    // if the email exists in our db - the response length count is 1
    // if not the response length value is 0
    const response = await axios.get(`${apiUrl}?email=${email}`)

    if(response.data.length > 0){
      alert("User account already exists");
      return;
    }

    await axios.post(`${apiUrl}`, {
      email, password
    });
    alert("Signup successful");
    navigate("/");
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5e558a] to-purple-300 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">

        {/* Left Side */}
        <div className="bg-[#5e558a] text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-3xl font-bold mb-4">Create Account</h1>
          <p className="text-center text-sm opacity-90">
            Join us today and start managing your dashboard easily.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-10">
          <h2 className="text-2xl font-bold text-[#5e558a] mb-6">
            Signup
          </h2>

          <form onSubmit={handleSignup} className="space-y-5">

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
                placeholder="Create a password"
              />
            </div>

            <button className="w-full bg-[#5e558a] text-white py-2 rounded-lg hover:scale-105 transition duration-300 shadow-md">
              Signup
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="text-[#5e558a] font-semibold">
                Signin
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;