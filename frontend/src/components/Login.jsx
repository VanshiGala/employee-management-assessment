import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from 'react-hot-toast'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //console.log("Sending:", email, password);

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
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-blue-600 relative overflow-hidden">
      <div className="bg-gray-100 w-[420px] p-8 rounded-lg border border-pink-500 shadow-xl">
        <h1 className="text-4xl font-bold text-center text-pink-500">IDMS</h1>

        <p className="text-center text-pink-500 mt-2">
          Welcome to HR Admin Panel
        </p>

        <div className="mt-6 space-y-4">
          <form onSubmit={handleLogin}>
            <label className="text-blue-500">User Name</label>
            <input
              type="email"
              placeholder="Enter User Name"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label className="text-blue-500">Enter Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
