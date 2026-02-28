import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
    </Routes>
  );
}

export default App;