import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between py-5 px-10">
      <NavLink to={"/"} className="font-bold text-2xl">
        Bloggify
      </NavLink>
      <div className="flex gap-4">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/blogs"}>Blogs</NavLink>
        <NavLink to={"/profile"}>Profile</NavLink>
      </div>
    </div>
  );
};

export default NavBar;
