import React, { useEffect, useState } from "react";
import './index.css';


function App() {

  const [games, setGames] = useState([]);
  const [mark, setMark] = useState("X");
  const [message, setMessage] = useState("");
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameMove, setGameMove] = useState([]);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    setGames(Array(9).fill(""));
    setIsGameFinished(false);
    setMark("X");
    setMessage("Hamle Sırası: " + mark);
    setGameMove([]);
  }

  const markGame = (index) => {
    if (isGameFinished || games[index] !== "") {
      return;
    }

    const newGames = [...games];
    newGames[index] = mark;
    setGames(newGames);
    setGameMove([...gameMove, newGames]);

    if (isGameOver(newGames)) {
      return;
    }

    if (isMoveFinished(newGames)) {
      setIsGameFinished(true);
      setMessage("Oyun berabere");
      return;
    }

    setMark(mark === "X" ? "O" : "X");
    setMessage(`Hamle Sırası: ${mark === "X" ? "O" : "X"}`);
  };

  const isGameOver = (newGames) => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (newGames[a] && newGames[a] === newGames[b] && newGames[a] === newGames[c]) {
        setIsGameFinished(true);
        setMessage(`Oyunu Kazanan: ${mark}`);
        return true;
      }
    }

    return false;
  };

  const isMoveFinished = (newGames) => {
    return newGames.every((game) => game !== "");
  };

  const setThatGameMove = (game) => {
    setGames(game);
  }

  return (
    <>

      <div className="container text-center">
        <h1>XOX game</h1>
        <h2 className="alert alert-warning">
          {message}
        </h2>
        <button className="btn btn-outline-primary w-100" onClick={newGame}>
          Yeni Oyun
        </button>
        <div className="row mt-2">
          {games.map((game, index) => {
            return (
              <div key={index} className="col-md-4 box" onClick={() => markGame(index)}>
                {game}
              </div>
            )
          })}
        </div>
        <hr />
        <div>
          {gameMove.map((game, index) => {
            return (
              <button key={index} onClick={() => setThatGameMove(game)}>
                {index + 1}. hamle
              </button>
            )
          })}
        </div>
      </div>


    </>
  );
}

export default App;
