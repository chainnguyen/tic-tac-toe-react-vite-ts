// Core
import { useMemo } from 'react'
// Others
import { LIST_TYPES } from '@/enums/game.enum'
// Types
import { IBoardBoxPropType } from '@/types/board'

function BoardBox(props: IBoardBoxPropType) {
  const { id, type, value, onClick } = props

  const fontSizeByType = useMemo<number>(
    () => LIST_TYPES.filter(i => i.type === type)[0]?.fontSize || LIST_TYPES[0].fontSize,
    [type]
  )

  return (
    <>
      <button
        className={`board-box ${value.isRewardBox ? 'reward-box' : ''}`}
        style={{ ['--font-size-by-type' as string]: String(fontSizeByType) + 'vw' }}
        onClick={() => onClick(+id)}>
        {value.box}
      </button>
    </>
  )
}

export default BoardBox
