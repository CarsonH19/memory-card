import { useState } from "react";
import Grid from "./components/grid";
import BestScore from "./components/bestScore";
import CurrentScore from "./components/currentScore";
import "./App.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);

  const handleCurrentScore = () => {
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
  };

  const handleBestScore = () => {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
  };

  const onCardClick = (e) => {
    const newCard = e.target;
    if (cards.includes(newCard)) {
      gameOver();
    } else {
      setCards([...cards, newCard]);
      handleCurrentScore();
      handleBestScore();
    }
  };

  const gameOver = () => {
    setCurrentScore(0);
    setCards([]);
  };

  return (
    <div>
      <h1>Nebula Memory Game</h1>
      <div className="scores">
        <CurrentScore currentScore={currentScore} />
        <BestScore bestScore={bestScore} />
      </div>
      <Grid onClick={onCardClick} />
    </div>
  );
}

export default App;
