export interface StateType {
  type: number
  xIsNext: boolean
  playing: boolean
  arrBoard: string[]
}

export interface TicTacToeRefType {
  reset: () => void
}

export interface TicTacToePropType {
  type: number
  controller: any
}
