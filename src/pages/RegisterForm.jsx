import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import axios from "axios";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("customer");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem('userRole', role);
      localStorage.setItem("role", data.role || role);

      alert("✅ Account created successfully!");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-900">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="flex items-center border rounded-xl px-3 mt-1">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="flex items-center border rounded-xl px-3 mt-1">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
            {/* Role Selector */}
            <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border rounded-xl px-3 mt-1">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-3 py-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="flex items-center border rounded-xl px-3 mt-1">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Re-enter your password"
                className="w-full px-3 py-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}