import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GameOver from "./Components/GameOver/GameOver";
import { createContext, useState } from "react";
import QuizHome from "./Components/QuizHome/QuizHome";
import Quiz from "./Components/Quiz/Quiz";

export const DarkMode = createContext();
export const QuizResult = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  return (
    <BrowserRouter>
      <DarkMode.Provider value={[darkMode, setDarkMode]}>
        <QuizResult.Provider value={[quizScore, setQuizScore]}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path="/quiz">
              <QuizHome />
            </Route>

            <Route exact path="/imran_quiz/:categoryId">
              <Quiz />
            </Route>
          </Switch>
        </QuizResult.Provider>
      </DarkMode.Provider>
    </BrowserRouter>
  );
}
export default App;
