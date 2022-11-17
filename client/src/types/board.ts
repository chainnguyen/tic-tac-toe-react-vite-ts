import { IStateType } from '@/types/game'

export type BoardType = {
  box: string
  isRewardBox: boolean
}

export interface IBoardPropType {
  state: IStateType
  onClick: (i: number) => void
}

export interface IBoardBoxPropType {
  id: number
  value: BoardType
  type: number
  onClick: (i: number) => void
}
