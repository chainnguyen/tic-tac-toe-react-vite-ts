import { BoardType } from '@/types/board'

export interface StateType {
  type: number
  xIsNext: boolean
  playing: boolean
  finished: boolean
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
  status: 'unfinished' | 'finished' | 'full-board'
  resultBoardWon: BoardType[]
}
