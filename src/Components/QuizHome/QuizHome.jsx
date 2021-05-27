import React, { useContext } from "react";
import "./QuizHome.css";
import QuizCategory from "../QuizCategory/QuizCategory";
import { categoryData } from "../../utilites/quizCategoryData";
import { Link } from "react-router-dom";
import { DarkMode } from "../../App";

const QuizHome = () => {
  const [darkMode, setDarkMode] = useContext(DarkMode);
  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: darkMode === true ? "#2C3E50" : "#ecf0f1",
        color: darkMode === true ? "#ECF0F1" : "#000",
      }}
    >
      <div>
        <h2 className="text-center">Choose Category</h2>
        <div
          id="quiz_category"
          className="d-flex flex-wrap justify-content-center align-items-center container-fluid"
        >
          {categoryData.map((category) => {
            const { name, id, img } = category;
            return (
              <Link to={`imran_quiz/${id}`}>
                <QuizCategory name={name} id={id} img={img} key={id} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuizHome;
