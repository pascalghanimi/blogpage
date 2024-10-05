import React from "react";
import background1 from "../assets/images/background1.jpg";
import background2 from "../assets/images/background2.jpg";
import background3 from "../assets/images/background3.jpg";
import background4 from "../assets/images/background4.jpg";
import background5 from "../assets/images/background5.jpg";

const HomeHeader = () => {
  return (
    <div className="flex justify-center gap-4 overflow-hidden relative">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-950 py-2 px-10">
        <p className="text-white font-light text-lg">share your story</p>
      </div>
      <img src={background1} alt="" className="h-96" />
      <img src={background2} alt="" className="h-96" />
      <img src={background3} alt="" className="h-96" />
      <img src={background4} alt="" className="h-96" />
      <img src={background5} alt="" className="h-96" />
    </div>
  );
};

export default HomeHeader;
