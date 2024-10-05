import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export const BlogsContext = createContext();

const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const blogsRef = collection(db, "blogs");
    const unsub = onSnapshot(blogsRef, async (snapshot) => {
      const allBlogs = [];
      const myBlogs = [];
      for (const blogDoc of snapshot.docs) {
        const createdByUserRef = doc(db, "users", blogDoc.data().createdBy);
        const createdByUser = await getDoc(createdByUserRef);
        if (blogDoc?.data()?.createdBy === user?.id) {
          myBlogs.push({
            ...blogDoc.data(),
            ...createdByUser.data(),
            blogID: blogDoc.id,
          });
        }

        allBlogs.push({
          ...blogDoc.data(),
          ...createdByUser.data(),
          blogID: blogDoc.id,
        });
      }

      console.log(allBlogs);

      setBlogs(
        allBlogs.sort((a, b) => b?.timestamp?.toDate() - a?.timestamp?.toDate())
      );
      setMyBlogs(
        myBlogs.sort((a, b) => b?.timestamp?.toDate() - a?.timestamp?.toDate())
      );
    });

    return () => {
      unsub();
    };
  }, [user]);

  return (
    <BlogsContext.Provider value={{ blogs, myBlogs }}>
      {children}
    </BlogsContext.Provider>
  );
};

export default BlogsProvider;
