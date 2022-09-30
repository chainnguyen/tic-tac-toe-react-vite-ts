// Core
import { useMemo } from 'react'
// Others
import { LIST_TYPES } from '@/enums/game.enum'
// Types
import { BoardBoxPropType } from '@/types/board'

function BoardBox(props: BoardBoxPropType) {
  const { id, type, value, onClick } = props

  const fontSizeByType = useMemo<number>(
    () => LIST_TYPES.filter(i => i.type === type)[0]?.fontSize || LIST_TYPES[0].fontSize,
    [type]
  )

  return (
    <>
      <button
        className="board-box"
        style={{ ['--font-size-by-type' as string]: String(fontSizeByType) + 'vw' }}
        onClick={() => onClick(+id)}>
        {value}
      </button>
    </>
  )
}

export default BoardBox
