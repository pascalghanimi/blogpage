import React, { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import pb from "../assets/images/pb.jpg";
import { UserContext } from "../context/UserProvider";
import { db, logout, storage } from "../config/firebase";
import { FaPen } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [usernameFieldSelected, setUsernameFieldSelected] = useState(false);
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);

  const usernameRef = useRef();
  const submitButtonRef = useRef();
  const fileRef = useRef();

  const handleLogout = (e) => {
    logout();
    console.log("Logged out!");
  };

  const handleFocusUsername = () => {
    usernameRef.current.focus();
    setUsernameFieldSelected(true);
  };

  const handleChangeUsername = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", user?.id);
      await updateDoc(userRef, {
        username,
      });
      toast.success("Username updated");
      setUsernameFieldSelected(false);
    } catch (error) {
      console.log(error);
      toast.error(error.code.replace(/[/-]/g, " "));
    }
  };

  const handleClickImage = () => {
    fileRef.current.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setAvatar(URL.createObjectURL(file));
      const imageRef = ref(storage, `/avatars/${user?.id}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);

      const userRef = doc(db, "users", user?.id);
      await updateDoc(userRef, {
        avatar: downloadURL,
      });
      toast.success("Image updated!");
    }
  };

  useEffect(() => {
    setUsername(user?.username);
  }, [user]);

  return (
    <div>
      <NavBar />
      <div className="h-56 bg-slate-400 relative">
        <div className="flex items-center flex-col shadow-md p-20 max-w-3xl absolute left-[50%] translate-x-[-50%] top-16 w-full">
          <button onClick={handleClickImage}>
            <img
              src={avatar || user?.avatar || pb}
              alt=""
              className="rounded-full w-48 h-48"
            />
          </button>
          <input
            type="file"
            name="file"
            id="file"
            hidden
            ref={fileRef}
            onChange={handleFileUpload}
          />
          <p className="font-semibold text-2xl text-gray-300 mt-6 ">
            {username}
          </p>

          <form
            onSubmit={handleChangeUsername}
            className="flex items-center gap-5 w-full mt-10"
          >
            <p className="font-bold">Username</p>
            <input
              type="text"
              name="username"
              id="username"
              ref={usernameRef}
              value={username || ""}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="outline-none p-2 border-b border-gray-300 w-full mb-3"
              onFocus={(e) => {
                setUsernameFieldSelected(true);
              }}
              onBlur={(e) => {
                if (!submitButtonRef.current.contains(e.relatedTarget)) {
                  setUsernameFieldSelected(false);
                }
              }}
            />
            {usernameFieldSelected ? (
              <button type="submit" ref={submitButtonRef}>
                <FaLocationArrow className="w-4 h-4" />
              </button>
            ) : (
              <FaPen
                className="w-4 h-4 hover:cursor-pointer"
                onClick={handleFocusUsername}
              />
            )}
          </form>
          <button
            onClick={handleLogout}
            className="bg-blue-400 text-white text-center rounded-md py-2 w-full mt-5"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
