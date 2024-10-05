import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import NavBar from "../components/NavBar";
import background1 from "../assets/images/background1.jpg";
import Section from "../components/Section";
import CommentField from "../components/CommentField";
import Comment from "../components/Comment";

const BlogPost = () => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchBlog = async () => {
    try {
      const blogRef = doc(db, "blogs", blogID);
      const blogDoc = await getDoc(blogRef);
      setBlog(blogDoc.data());
    } catch (error) {
      console.log(error);
      toast.error(error.code.replace(/[/-]/g, " "));
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    const commentsRef = collection(doc(db, "blogs", blogID), "comments");
    const unsub = onSnapshot(commentsRef, async (snapshot) => {
      const comments = [];
      for (const comment of snapshot.docs) {
        const creatorRef = doc(db, "users", comment.data().createdBy);
        const creatorDoc = await getDoc(creatorRef);

        comments.push({
          ...comment.data(),
          creator: creatorDoc.data(),
          commentID: comment.id,
        });
      }
      setComments(
        comments.sort((a, b) => b?.timestamp?.toDate() - a?.timestamp?.toDate())
      );
    });

    return () => {
      unsub();
    };
  }, [blogID]);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center w-full mt-10 text-center">
        <div className="flex items-center flex-col max-w-3xl">
          <img src={background1} alt="" className="w-full rounded-xl " />
          <p className="font-bold mt-16 text-3xl">{blog?.title}</p>
          {blog?.sections.map((section) => {
            return <Section title={section?.title} text={section?.text} />;
          })}
          <CommentField blogID={blogID} />
          <div className="w-full mb-20">
            {comments.map((comment) => {
              return (
                <Comment
                  key={comment?.commentID}
                  creator={comment?.creator}
                  comment={comment?.comment}
                  time={comment?.timestamp?.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
