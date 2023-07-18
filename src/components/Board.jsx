import React from 'react'

import Box from './Box.jsx';
import './Board.css';

const Board = ({boardd, onClick}) => {
  return (
    <div className="board">
        {
            boardd.map((value,idx) => {
                return <Box key={idx} value={value} onClick={()=> value === null && onClick(idx)} />
            })
        }
    </div>
  )
}

export default Board;