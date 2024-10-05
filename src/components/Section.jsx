import React from "react";

const Section = ({ text, title }) => {
  return (
    <div className="mt-5">
      <p className="font-bold text-xl">{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default Section;
