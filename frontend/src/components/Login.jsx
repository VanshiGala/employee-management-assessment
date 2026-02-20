import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //console.log("FUNCTION STARTED");

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("Invalid email format");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      //console.log("Login response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      //console.log("LOGIN ERROR:", error);
      //console.log("ERROR RESPONSE:", error.response);

      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#4f77b5] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gray-200 rounded-t-[100%]"></div>

      <div className="relative z-10 bg-gray-100 w-[420px] p-8 rounded-md border border-pink-500 shadow-xl">
        <h1 className="text-4xl font-bold text-center text-pink-500">IDMS</h1>

        <p className="text-center text-pink-500 mt-2 text-sm">
          Welcome to HR Admin Panel
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-blue-500 text-sm">User Name</label>
            <input
              type="email"
              placeholder="Enter User Name"
              className="w-full border border-gray-300 p-2 mt-1 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-blue-500 text-sm">Enter Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full border border-gray-300 p-2 mt-1 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>

            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4f77b5] text-white py-2 mt-4 text-sm hover:bg-[#3f669f] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
