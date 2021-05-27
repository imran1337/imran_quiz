import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { DarkMode, QuizResult } from "../../App";

const GameOver = ({ setQuizLife }) => {
  const history = useHistory();
  const [darkMode, setDarkMode] = useContext(DarkMode);
  const [quizScore, setQuizScore] = useContext(QuizResult);
  const retryGame = () => {
    setQuizLife(5);
    setQuizScore(0);
  };
  return (
    <section
      style={{
        height: "100vh",
        width: "100vw",
        background: darkMode === true ? "#2C3E50" : "#ecf0f1",
        color: darkMode === true ? "#ECF0F1" : "#000",
      }}
      className="d-flex justify-content-center align-items-center text-center"
    >
      <div style={{ width: "100vh", maxWidth: "600px" }}>
        <Card
          className="mx-3 shadow"
          style={{
            background: darkMode === true ? "#2C3E50" : "#ecf0f1",
            color: darkMode === true ? "#ECF0F1" : "#000",
          }}
        >
          <Card.Body>
            <Card.Title>
              <span style={{ fontSize: "60px" }}>GAME OVER</span>
            </Card.Title>
            <Card.Text>
              <span style={{ fontSize: "40px" }}>Score </span>{" "}
              <span style={{ display: "block", fontSize: "70px" }}>
                {quizScore}
              </span>
            </Card.Text>
            <div className="d-flex">
              <Button
                variant="primary"
                className="w-100 me-3"
                onClick={() => history.push("/home")}
              >
                Home
              </Button>
              <Button
                variant="primary"
                className="w-100 ms-3"
                onClick={retryGame}
              >
                Retry
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

export default GameOver;
