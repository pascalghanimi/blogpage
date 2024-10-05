import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import pb from "../assets/images/pb.jpg";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const CommentField = ({ blogID }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const commentRef = collection(db, "blogs", blogID, "comments");
      const commentDoc = await addDoc(commentRef, {
        comment,
        createdBy: user?.id,
        timestamp: serverTimestamp(),
      });
      toast.success("Thanks for your comment!");
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error(error.code.replace(/[/-]/g, " "));
    }
  };

  return (
    <div className="flex w-full gap-4 mt-10">
      <img
        src={user?.avatar || pb}
        alt=""
        className="w-12 h-12 object-cover rounded-full"
      />
      <form onSubmit={handleAddComment} className="w-full">
        <textarea
          name="comment"
          id="comment"
          placeholder="Write a comment"
          className="border border-gray-300 rounded-xl outline-none p-4 w-full h-32"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
        <button
          type="submit"
          className="px-20 bg-blue-400 text-white py-2 rounded-md justify-start w-full mt-1 mb-10"
        >
          Post comment
        </button>
      </form>
    </div>
  );
};

export default CommentField;
