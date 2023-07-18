import './App.css';
import React, {useState} from "react";

import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard.jsx';
import ResetButton from './components/ResetButton';

function App() {

  const WIN_CONDITIONS = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [2,5,8],
    [6,7,8],
    [2,4,6],
    [1,4,7],
    [3,4,5],
  ]
  const [board,setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [score, setScore] = useState({xScore: 0, oScore: 0});
  const [gameOver,setGameOver] = useState(false);


  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value,idx)=>{
      if(idx===boxIdx) {
        return xPlaying?"X":"O";
      }else {
        return value; 
      }
    })
    setBoard(updatedBoard);
    
    const winner = checkWinner(updatedBoard);
    if(winner) {
      if(winner === "O") {
        let {oScore} = score;
        oScore = oScore + 1;
        setScore({...score,oScore});
      }else {
        let {xScore} = score;
        xScore = xScore + 1;
        setScore({...score,xScore});
      }
    }

    setXPlaying(!xPlaying);
  }

  // checkWinner
  const checkWinner = (board) => {
    for(let i =0; i<WIN_CONDITIONS.length;i++) {
      const [x,y,z] = WIN_CONDITIONS[i];

      if(board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
    return null;
  }

  // reset Board
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }

  return (
    <div className='App'>
        <ScoreBoard score = {score} xPlaying={xPlaying} />
        <Board boardd={board} onClick={gameOver ? resetBoard : handleBoxClick} />
        <ResetButton resetBoard={resetBoard} />
    </div>
  )
}

export default App;
