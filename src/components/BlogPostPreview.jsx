import React from "react";
import background1 from "../assets/images/background1.jpg";

const BlogPostPreview = ({ title, text, avatar }) => {
  return (
    <div>
      <img
        src={avatar || background1}
        alt=""
        className="rounded-lg h-60 w-full object-cover"
      />
      <p className="font-bold text-lg mt-2">{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default BlogPostPreview;
