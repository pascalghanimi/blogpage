import React, { useContext } from "react";
import { BlogsContext } from "../context/BlogsProvider";
import BlogPostPreview from "./BlogPostPreview";
import { Link } from "react-router-dom";

const MyBlogPosts = () => {
  const { myBlogs } = useContext(BlogsContext);
  console.log(myBlogs);

  return (
    <div className="w-[90%] flex mx-auto flex-wrap gap-5 mt-10">
      {myBlogs?.map((blog) => {
        return (
          <Link
            className="w-[30%]"
            key={blog?.blogID}
            to={`/blogs/${blog?.blogID}`}
          >
            <BlogPostPreview
              title={blog?.title || "Nothing to see here yet..."}
              text={
                blog?.sections[0]?.text
                  ? blog?.sections[0]?.text.slice(0, 100) + "..."
                  : "Click here to read more..."
              }
              avatar={blog?.headerImage}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default MyBlogPosts;
