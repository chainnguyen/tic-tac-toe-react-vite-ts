// Core
import { useMemo } from 'react'
// Types
import { BoardType } from '@/types/board'
import { CalculatePropType, TicTacToeWinnerType } from '@/types/game'

export const useCalculate = ({ type }: CalculatePropType) => {
  const memoListReward = useMemo<number[][]>(() => {
    const arrLinesByType: string[] = Array(type).fill('')
    const arrBoard: number[] = [...Array(type * type).keys()]
    const ltrCrossLines: number[] = []
    const rtlCrossLines: number[] = []

    return arrLinesByType.reduce((arr: number[][], _: string, rootIdx: number) => {
      const horizontalLines: number[] = arrBoard.slice(rootIdx * type, rootIdx * type + type)
      const verticalLines: number[] = arrLinesByType.map(
        (_, childIdx: number) => arrBoard[rootIdx + childIdx * type]
      )

      arr.push(horizontalLines, verticalLines)
      return arr
    }, [])
  }, [type])

  const ticTacToeWinner = (board: BoardType[]): TicTacToeWinnerType => {
    const cloneBoard: BoardType[] = [...board]
    const initObj: TicTacToeWinnerType = { status: 'unfinished', resultBoardWon: cloneBoard }

    if (!cloneBoard.length) return initObj

    for (let rootIdx = 0; rootIdx < memoListReward.length; rootIdx++) {
      const verify: boolean = memoListReward[rootIdx].every((i: number) =>
        cloneBoard[memoListReward[rootIdx][0]].box &&
        (cloneBoard[memoListReward[rootIdx][0]].box === cloneBoard[i].box)
      )

      if (verify) {
        memoListReward[rootIdx].forEach((i: number) => {
          cloneBoard[i] = { ...cloneBoard[i], isRewardBox: true }
        })
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
