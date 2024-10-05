import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import HomeHeader from "../components/HomeHeader";
import BlogPostPreview from "../components/BlogPostPreview";
import { BlogsContext } from "../context/BlogsProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { blogs } = useContext(BlogsContext);
  console.log(blogs);

  return (
    <div className="mb-20">
      <NavBar />
      <HomeHeader />
      <p className="font-bold text-center text-3xl mt-20 mb-10">Recent Posts</p>
      <div className="w-[90%] flex mx-auto flex-wrap gap-5">
        {blogs?.map((blog) => {
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
    </div>
  );
};

export default Home;
