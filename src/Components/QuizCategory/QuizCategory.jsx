import React from "react";

const QuizCategory = ({ name, id, img }) => {
  return (
    <div
      className="bg-primary m-3 text-center p-2 d-flex justify-content-center align-items-center"
      style={{ width: "150px", height: "70px" }}
    >
      <p className="mb-0 text-white">{name}</p>
    </div>
  );
};

export default QuizCategory;