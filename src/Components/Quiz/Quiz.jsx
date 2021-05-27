import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { DarkMode, QuizResult } from "../../App";
import { shuffleArray } from "../../utilites/shuffleArray";
import GameOver from "../GameOver/GameOver";
import "./Quiz.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Quiz = () => {
  const [darkMode, setDarkMode] = useContext(DarkMode);
  const [quizScore, setQuizScore] = useContext(QuizResult);
  const [quizLife, setQuizLife] = useState(5);

  const { categoryId } = useParams();

  const [quiz, setQuiz] = useState([]);
  const [singleQuiz, setSingleQuiz] = useState(0);
  const [quizOptions, setQuizOptions] = useState(0);
  const showQuiz = quiz[singleQuiz] || {
    incorrect_answers: "",
    correct_answer: "",
  };

  const { incorrect_answers, correct_answer } = showQuiz;
  // console.log(incorrect_answers, correct_answer);

  // let quizOptions = shuffleArray([...incorrect_answers, correct_answer]);
  // console.log(quizOptions);

  useEffect(() => {
    setQuizOptions(shuffleArray([...incorrect_answers, correct_answer]));
    console.log("runnign");
    return () => {
      console.clear();
    };
  }, [correct_answer, singleQuiz, setSingleQuiz]);

  const getQuiz = async () => {
    const quizApiUrl =
      (categoryId === "imran" && `https://opentdb.com/api.php?amount=10`) ||
      `https://opentdb.com/api.php?amount=10&category=${categoryId}`;
    const quizData = await axios.get(quizApiUrl);
    setQuiz([]);
    setQuiz(quizData.data.results);
  };

  useEffect(() => {
    getQuiz();
  }, [categoryId]);

  const getCorrectAnswer = (e) => {
    const clickedAnswer = e.target.innerText;
    const isAnswerRight = clickedAnswer === correct_answer;

    isAnswerRight && setQuizScore(quizScore + 5);
    !isAnswerRight && setQuizLife(quizLife - 1);

    isAnswerRight
      ? e.target.classList.add("bg-success")
      : e.target.classList.add("bg-danger");

    e.target.classList.remove("bg-white");

    setTimeout(() => {
      setSingleQuiz(singleQuiz + 1);
      singleQuiz === 9 && setSingleQuiz(0) && getQuiz();
      e.target.classList.add("bg-white");
      e.target.classList.remove("bg-success");
      e.target.classList.remove("bg-danger");
    }, 1000);
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const QuizTimer = () => {
    return (
      <CountdownCircleTimer
        isPlaying
        duration={30}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        onComplete={() => {
          setQuizLife(quizLife - 1);
          setSingleQuiz(singleQuiz + 1);
          return [true, 2000];
        }}
      >
        {renderTime}
      </CountdownCircleTimer>
    );
  };

  return (
    <>
      {quizLife < 1 ? (
        <GameOver setQuizLife={setQuizLife} />
      ) : (
        <section
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            background: darkMode === true ? "#2C3E50" : "#ecf0f1",
            color: darkMode === true ? "#ECF0F1" : "#000",
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-center m-3">
              <h3 className="">Score</h3>
              <h1 className="">{quizScore}</h1>
            </div>
            <div className="text-center m-3">
              <QuizTimer />
            </div>
            <div className="text-center m-3">
              <h3 className="">Life</h3>
              <h1 className="">{quizLife}</h1>
            </div>
          </div>
          <div
            style={{ minHeight: "400px", maxWidth: "960px" }}
            className="m-3  container bg-primary p-5 rounded shadow d-flex align-items-center justify-content-center"
          >
            <div>
              <h2
                className="pb-4 text-center"
                dangerouslySetInnerHTML={{ __html: showQuiz?.question }}
              />

              <Row className="text-center justify-content-center">
                {quizOptions.length &&
                  quizOptions.map((ans, idx) => {
                    return (
                      <Col xs={12} sm={6} key={idx} className="">
                        <p
                          className="bg-white text-dark p-3 rounded shadow text-center answer_style"
                          style={{ fontSize: "20px", cursor: "pointer" }}
                          onClick={(event) => {
                            getCorrectAnswer(event);
                          }}
                          dangerouslySetInnerHTML={{ __html: ans }}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Quiz;
