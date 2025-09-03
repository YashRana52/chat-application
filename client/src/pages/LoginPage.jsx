import React, { useState } from "react";
import assets from "../assets/assets";
import { useAuthContext } from "../../context/AuthContext";

function LoginPage() {
  const [state, setState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useAuthContext();

  const onSubmitHnadler = async (e) => {
    e.preventDefault();
    if (state === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(state === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col px-4">
      {/* left */}
      <img
        src={assets.logo_big}
        alt="Logo"
        className="w-[min(30vw,250px)] drop-shadow-lg"
      />

      {/* right */}
      <form
        onSubmit={onSubmitHnadler}
        className="border border-gray-600 bg-white/10 backdrop-blur-md text-white p-6 flex flex-col gap-6 rounded-lg shadow-xl w-full max-w-sm"
      >
        {/* heading */}
        <h2 className="font-semibold text-2xl flex justify-between items-center">
          {state}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="Back"
              className="w-5 cursor-pointer hover:scale-110 transition"
            />
          )}
        </h2>

        {/* inputs */}
        {state === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md bg-transparent placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              required
              className="p-2 border border-gray-500 rounded-md bg-transparent placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="p-2 border border-gray-500 rounded-md bg-transparent placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {state === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md bg-transparent placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio"
            required
          ></textarea>
        )}

        {/* submit btn */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-500 to-violet-700 hover:from-purple-600 hover:to-violet-800 text-white rounded-md font-medium transition shadow-md"
        >
          {state === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        {/* terms */}
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" className="accent-violet-600" required />
          Agree to the terms of use & privacy policy.
        </label>

        {/* switch */}
        <div className="text-sm text-center">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setState("Login");
                  setIsDataSubmitted(false);
                }}
                className="text-violet-400 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Create an account{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-violet-400 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
