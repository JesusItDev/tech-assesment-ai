import React from "react";

const Loading = () => {
  return (
    <div className="p-3 bg-bg-light border-border w-15 h-15 animate-pulse aspect-square rounded-full shadow-lg mt-3 ">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};

export default Loading;
