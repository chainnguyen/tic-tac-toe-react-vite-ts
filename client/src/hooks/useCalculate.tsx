// Core
import { useMemo } from 'react'
// Types
import { BoardType } from '@/types/board'
import { CalculatePropType, TicTacToeWinnerType } from '@/types/game'

export const useCalculate = ({ type }: CalculatePropType) => {
  const memoListReward = useMemo<number[][]>(() => {
    // TODO: Take two cross lines
    const arrLinesByType: string[] = Array(type).fill('')
    const arrBoard: number[] = [...Array(type * type).keys()]

    return arrLinesByType.reduce((arr: number[][], _: string, rootIdx: number) => {
      const horizontalLines: number[] = arrBoard.slice(rootIdx * type, rootIdx * type + type)
      const verticalLines: number[] = arrLinesByType.map(
        (_, childIdx: number) => arrBoard[rootIdx + childIdx * type]
      )

      arr.push(horizontalLines)
      arr.push(verticalLines)
      return arr
    }, [])
  }, [type])

  const ticTacToeWinner = (board: BoardType[]): TicTacToeWinnerType => {
    const cloneBoard: BoardType[] = [...board]
    const initObj: TicTacToeWinnerType = { status: 'unfinished', resultBoardWon: cloneBoard }

    if (!cloneBoard.length) return initObj

    // TODO: Logical dynamic transformation
    for (let rootIdx = 0; rootIdx < memoListReward.length; rootIdx++) {
      const [a, b, c] = memoListReward[rootIdx]

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
