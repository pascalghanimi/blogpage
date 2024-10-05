import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="shadow-md p-20 rounded-md flex flex-col items-center">
        <p className="font-bold text-center text-3xl mb-10">Bloggify</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="outline-none p-2 border border-gray-300 rounded-full w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="outline-none p-2 border border-gray-300 rounded-full w-full mb-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center mb-4">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="font-bold">
              Register
            </Link>
          </div>
          <button
            type="submit"
            className="rounded-full bg-blue-400 text-white text-center w-full py-2"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
