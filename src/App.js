import React, { useEffect, useState } from "react";
import './index.css';


function App() {

  const [games, setGames] = useState([]);
  const [mark, setMark] = useState("X");
  const [message, setMessage] = useState("");
  const [isGameFinished, SetIsGameFinished] = useState(false);
  const [gameMove, setGameMove] = useState([]);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    setGames([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]);

    SetIsGameFinished(false);
    setMark("X");
    setMessage("Hamle Sırası: " + mark);
    setGameMove([]);
  }

  const markGame = (index) => {

    const newGames = [...games];
    if (isGameFinished || newGames[index] !== "") {
      return;
    }

    newGames[index] = mark;


    setGames(newGames);
    setGameMove((val) => [...val, newGames]);

    if (isGameOver(newGames)) {
      return;
    }

    if (isMoveFinished(newGames)) {
      SetIsGameFinished(true);
      setMessage("Oyun berabere");
      return;
    }

    mark === "X" ? setMark("O") : setMark("X");
    setMessage("Hamle Sırası: " + (mark === "X" ? "O" : "X"));


  }

  const isGameOver = (newGames) => {

    let isFinished = false;

    if (newGames[0] !== "" && newGames[0] === newGames[1] && newGames[0] === newGames[2]) {
      isFinished = true;
    }
    else if (newGames[3] !== "" && newGames[3] === newGames[4] && newGames[3] === newGames[5]) {
      isFinished = true;
    }
    else if (newGames[6] !== "" && newGames[6] === newGames[7] && newGames[6] === newGames[8]) {
      isFinished = true;
    }
    else if (newGames[0] !== "" && newGames[0] === newGames[3] && newGames[0] === newGames[6]) {
      isFinished = true;
    }
    else if (newGames[1] !== "" && newGames[1] === newGames[4] && newGames[1] === newGames[7]) {
      isFinished = true;
    }
    else if (newGames[2] !== "" && newGames[2] === newGames[5] && newGames[2] === newGames[8]) {
      isFinished = true;
    }
    else if (newGames[0] !== "" && newGames[0] === newGames[4] && newGames[0] === newGames[8]) {
      isFinished = true;
    }
    else if (newGames[2] !== "" && newGames[2] === newGames[4] && newGames[2] === newGames[6]) {
      isFinished = true;
    }

    if (isFinished) {
      SetIsGameFinished(true);
      setMessage("Oyunu Kazanan: " + (mark));
    }

    return isFinished;
  }

  const isMoveFinished = (newGames) => {

    let emptyCount = 0;

    for (let i = 0; i < newGames.length; i++) {
      const element = newGames[i];
      if (element === "") {
        emptyCount++;
      }
    }

    return emptyCount === 0;
  }

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
