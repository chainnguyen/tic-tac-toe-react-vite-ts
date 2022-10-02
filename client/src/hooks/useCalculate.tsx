// Types
import { BoardType } from '@/types/board'
import { TicTacToeWinnerType } from '@/types/game'

export const useCalculate = () => {

  const ticTacToeWinner = (board: BoardType[]): TicTacToeWinnerType => {
    const cloneBoard: BoardType[] = [...board]
    const initObj: TicTacToeWinnerType = { status: 'unfinished', resultBoardWon: cloneBoard }
    if (!cloneBoard.length) return initObj

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        cloneBoard[a].box &&
        cloneBoard[a].box === cloneBoard[b].box &&
        cloneBoard[a].box === cloneBoard[c].box
      ) {
        cloneBoard[a] = { ...cloneBoard[a], isRewardBox: true }
        cloneBoard[b] = { ...cloneBoard[b], isRewardBox: true }
        cloneBoard[c] = { ...cloneBoard[c], isRewardBox: true }
        return { status: 'finished', resultBoardWon: cloneBoard }
      }
    }

    // In case of running out of boxes but still no winner
    if (cloneBoard.every(item => item.box)) {
      return { ...initObj, status: 'full-board'}
    }
    return initObj
  }

  return { ticTacToeWinner }
}
