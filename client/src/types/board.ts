import { StateType } from '@/types/game'

export interface BoardPropType {
  state: StateType
  onClick: (i: number) => void
}

export interface BoardBoxPropType {
  id: number
  value: string
  type: number
  onClick: (i: number) => void
}
