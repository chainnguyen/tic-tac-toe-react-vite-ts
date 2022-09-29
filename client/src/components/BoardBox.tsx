// Types
import { BoardBoxPropType } from '@/types/board'

function BoardBox(props: BoardBoxPropType) {
  return (
    <>
      <button
        className="square"
        onClick={() => props.onClick(+props.value)}>
        {props.value}
      </button>
    </>
  )
}

export default BoardBox
