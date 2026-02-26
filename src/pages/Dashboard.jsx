import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-[#5e558a] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-purple-300">
          MyApp
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <button className="w-full text-left px-4 py-2 rounded hover:bg-purple-400 transition">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-purple-400 transition">
            Profile
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-purple-400 transition">
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-purple-300">
          <button
            onClick={handleLogout}
            className="w-full bg-red-300 text-red-700 font-bold cursor-pointer py-2 rounded hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#5e558a]">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">
              {user?.email}
            </span>

            <div className="w-10 h-10 rounded-full bg-[#5e558a] text-white flex items-center justify-center font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 flex-1 overflow-y-auto">

          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-700">
              Welcome back 👋
            </h2>
            <p className="text-gray-500">
              Here's what's happening with your account today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <p className="text-2xl font-bold text-[#5e558a] mt-2">120</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-500 text-sm">Active Sessions</h3>
              <p className="text-2xl font-bold text-[#5e558a] mt-2">45</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-gray-500 text-sm">New Messages</h3>
              <p className="text-2xl font-bold text-[#5e558a] mt-2">8</p>
            </div>

          </div>

          {/* Activity Section */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-[#5e558a]">
              Recent Activity
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>✔ Logged in successfully</li>
              <li>✔ Updated profile information</li>
              <li>✔ Viewed dashboard analytics</li>
              <li>✔ Checked notifications</li>
            </ul>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;