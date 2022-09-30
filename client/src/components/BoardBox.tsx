// Types
import { BoardBoxPropType } from '@/types/board'

function BoardBox(props: BoardBoxPropType) {
  return (
    <>
      <button
        className="board-box"
        onClick={() => props.onClick(+props.id)}>
        {props.value}
      </button>
    </>
  )
}

export default BoardBox
