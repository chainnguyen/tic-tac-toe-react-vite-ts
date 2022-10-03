import { BoardType } from '@/types/board'

type StatusGame = 'unfinished' | 'finished' | 'full-board'

export interface StateType {
  type: number
  status: StatusGame
  xIsNext: boolean
  playing: boolean
  arrBoard: BoardType[]
}

export interface TicTacToeRefType {
  reset: () => void
}

export interface TicTacToePropType {
  type: number
  controller: any
}

export interface TicTacToeWinnerType {
  status: StatusGame
  resultBoardWon: BoardType[]
}

export interface CalculatePropType {
  type: number
}
