import { StateType } from '@/types/game'

export type BoardType = {
  box: string
  isRewardBox: boolean
}

export interface BoardPropType {
  state: StateType
  onClick: (i: number) => void
}

export interface BoardBoxPropType {
  id: number
  value: BoardType
  type: number
  onClick: (i: number) => void
}
