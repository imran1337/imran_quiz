import {
  faCog,
  faMoon,
  faRedo,
  faTimes,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DarkMode, QuizResult } from "../../App";
import "./Home.css";
const Home = () => {
  const [darkMode, setDarkMode] = useContext(DarkMode);
  const [gearMenu, setGearMenu] = useState(true);
  const [volumeMute, setVolumeMute] = useState(false);
  const [quizScore, setQuizScore] = useContext(QuizResult);
  return (
    <section
      className="home"
      style={{
        background: darkMode === true ? "#2C3E50" : "#ecf0f1",
        color: darkMode === true ? "#ECF0F1" : "#000",
      }}
    >
      <div>
        <h2
          style={{
            color: darkMode === true ? "#ECF0F1" : "#000",
            fontSize: "80px",
          }}
        >
          Imran <br /> Quiz
        </h2>
        <Link to="/quiz">
          <Button
            style={{ width: "288px", fontSize: "26px" }}
            className="p-3 my-3"
            onClick={() => setQuizScore(0)}
          >
            Start
          </Button>
        </Link>
        <p style={{ fontSize: "20px" }}>Highscore: {quizScore}</p>

        <div>
          <div style={{ position: "absolute", right: 5, bottom: 5 }}>
            {(gearMenu && (
              <FontAwesomeIcon
                icon={faCog}
                size="4x"
                onClick={() => setGearMenu(false)}
              />
            )) || (
              <div>
                <FontAwesomeIcon
                  size="4x"
                  icon={faTimes}
                  className="d-inline-block mx-2"
                  onClick={() => setGearMenu(true)}
                />

                {/********* Volume mute logic */}

                {(volumeMute && (
                  <FontAwesomeIcon
                    size="4x"
                    icon={faVolumeMute}
                    className="d-inline-block mx-2"
                    onClick={() => setVolumeMute(false)}
                  />
                )) || (
                  <FontAwesomeIcon
                    size="4x"
                    icon={faVolumeUp}
                    className="d-inline-block mx-2"
                    onClick={() => setVolumeMute(true)}
                  />
                )}

                <FontAwesomeIcon
                  style={{ fontSize: "50px" }}
                  icon={faRedo}
                  className="d-inline-block mx-2"
                  onClick={() => {
                    setGearMenu(true);
                    setQuizScore(0);
                  }}
                />
              </div>
            )}
          </div>
          <div style={{ position: "absolute", left: 5, bottom: 5 }}>
            <FontAwesomeIcon
              icon={faMoon}
              size="4x"
              onClick={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
