// Core
import { useMemo } from 'react'
// Components
import BoardBox from '@/components/BoardBox'
// Types
import { BoardPropType } from '@/types/board'

function Board(props: BoardPropType) {
  const arrBoard = useMemo<number[]>(
    () => [...Array(props.type * props.type).keys()],
    [props.type]
  )

  return (
    <div>
      {arrBoard.map((index: number) =>
        <BoardBox
          key={index}
          value={index}
          onClick={(i: number) => props.onClick(i)}/>
      )}
    </div>
  )
}

export default Board
