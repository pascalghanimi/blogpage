import React, { useContext, useEffect, useRef, useState } from "react";
import pb from "../assets/images/pb.jpg";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../config/firebase";
import { UserContext } from "../context/UserProvider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const imageInputRef = useRef();

  const handleRegister = (e) => {
    e.preventDefault();
    register(email, username, password, file);
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setFile(file);
    }
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
        <button onClick={handleImageClick}>
          <img
            src={avatar || pb}
            alt=""
            className="w-52 h-52 rounded-full mb-6"
          />
        </button>
        <form onSubmit={handleRegister}>
          <input
            type="file"
            name="file"
            id="file"
            hidden
            ref={imageInputRef}
            onChange={handleImageUpload}
          />
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
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="outline-none p-2 border border-gray-300 rounded-full w-full mb-3 "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Already have an account?{" "}
            <Link to={"/login"} className="font-bold">
              Login
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

export default Register;
