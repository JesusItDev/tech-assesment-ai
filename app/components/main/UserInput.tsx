import React from "react";

const UserInput = () => {
  return (
    <>
      <textarea
        placeholder="Input a prompt..."
        className="bg-bg-light rounded-xl field-sizing-content max-h-40 w-4/5 p-2 overflow-y-scroll no-scrollbar "
      />
      <button className="p-2 bg-primary w-1/12 rounded-xl">Submit</button>
      <button className="p-2 bg-warning w-1/12 rounded-xl">Clear</button>
    </>
  );
};

export default UserInput;
