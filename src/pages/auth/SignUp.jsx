import React, { useEffect, useRef, useState } from "react";
import "../../tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handelRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUsername("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("no server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 409) {
        setErrMsg("username already taken");
      } else {
        setErrMsg("registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-gray-800 to-black login-container">
      <div className="w-2/5 bg-black py-10 pb-14 rounded-lg">
        <div className="text-4xl text-center py-5">
          <FontAwesomeIcon icon={faSpotify} className="text-5xl" />
          <h1 className="pt-2 font-bold">
            Sign up to
            <br /> start listening
          </h1>
        </div>
        <div>
          <form className="flex flex-col" onSubmit={handelRegister}>
            <div
              className={errMsg ? "text-center text-red-500 p-1 pb-2" : ""}
              ref={errRef}
            >
              {errMsg}
            </div>
            <input
              type="text"
              placeholder="Email or username"
              required
              ref={userRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-green-500 mx-24 rounded-full py-3 font-bold text-xl text-black my-3 hover:scale-105 focus:ring-2 focus:ring-white transition-all duration-150">
              Sign Up
            </button>
          </form>
        </div>
        <p className="text-center text-slate-400">
          Already have an account?&nbsp;
          <span className="underline text-white hover:text-green-500">
            <Link to="/login">Log in here.</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
