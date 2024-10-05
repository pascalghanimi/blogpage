import React, { useState } from "react";
import NavBar from "../components/NavBar";
import AddBlogPost from "../components/AddBlogPost";
import MyBlogPosts from "../components/MyBlogPosts";

const Blogs = () => {
  const [showBlogPosts, setShowBlogPosts] = useState(true);

  return (
    <div>
      <NavBar />
      <div className="flex gap-7 justify-center mt-10">
        <button
          className="bg-slate-400 text-white text-center rounded-full px-10 py-2"
          onClick={() => {
            setShowBlogPosts(true);
          }}
        >
          Show My Blogs
        </button>
        <button
          className="bg-blue-400 text-white text-center rounded-full px-10 py-2"
          onClick={() => {
            setShowBlogPosts(false);
          }}
        >
          Add a Blog Post
        </button>
      </div>
      {showBlogPosts ? <MyBlogPosts /> : <AddBlogPost />}
    </div>
  );
};

export default Blogs;
