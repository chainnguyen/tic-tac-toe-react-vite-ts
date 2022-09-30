// Components
import BoardBox from '@/components/BoardBox'
// Types
import { BoardPropType } from '@/types/board'

function Board({ state, onClick }: BoardPropType) {
  return (
    <>
      {state.arrBoard.map((item: string, index: number) =>
        <BoardBox
          key={index}
          id={index}
          type={state.type}
          value={item}
          onClick={(i: number) => onClick(i)}/>
      )}
    </>
  )
}

export default Board
