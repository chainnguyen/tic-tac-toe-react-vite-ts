// Core
import { useState } from 'react'
// Components
import Board from '@/components/Board'
// Types

function TicTacToe() {
  const [typeGame, setTypeGame] = useState<3 | 5 | 7>(5)
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const handleClick = (index: number): void => {
    console.log(index)
  }

  return (
    <>
      <Board
        type={typeGame}
        onClick={(i: number) => handleClick(i)}
      />
      <h1 className="text-3xl font-bold underline">Tailwind</h1>
    </>
  )
}

export default TicTacToe
