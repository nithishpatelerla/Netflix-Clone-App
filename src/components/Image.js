import React from "react";

const Image = ({ imgUrl }) => {
  return (
    <>
      <div className="row-item  ">
        <img
          src={imgUrl}
          alt="moivieimage"
          className="max-w-none sm:w-[98%] w-[83%] sm:pl-0 ml-4  rounded-lg     hover:scale-125  hover:z-10 hover:border-4 active:border-4 active:border-red-700 border-white transition-all"
        />
      </div>
    </>
  );
};

export default Image;
