// Components
import BoardBox from '@/components/BoardBox'
// Types
import { IBoardPropType, BoardType } from '@/types/board'

function Board({ state, onClick }: IBoardPropType) {
  return (
    <>
      {state.arrBoard.map((item: BoardType, index: number) =>
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
