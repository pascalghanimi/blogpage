import React from "react";
import pb from "../assets/images/pb.jpg";

const Comment = ({ time, comment, creator }) => {
  console.log(creator);
  return (
    <div className="flex gap-4 mt-5">
      <img
        src={creator?.avatar || pb}
        alt=""
        className="w-12 h-12 rounded-full"
      />
      <div>
        <div className="flex gap-3 mb-1 items-center justify-start">
          <p className="font-semibold">{creator?.username}</p>
          <p className="text-xs">{time}</p>
        </div>
        <p className="text-left">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
