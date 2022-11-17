import { BoardType } from '@/types/board'

export type StatusGame = 'unfinished' | 'finished' | 'full-board'

export interface IStateType {
  type: number
  status: StatusGame
  xIsNext: boolean
  playing: boolean
  arrBoard: BoardType[]
}

export interface ITicTacToeRefType {
  reset: () => void
}

export interface ITicTacToePropType {
  type: number
  controller: any
}

export interface ITicTacToeWinnerType {
  status: StatusGame
  resultBoardWon: BoardType[]
}

export interface ICalculatePropType {
  type: number
}
