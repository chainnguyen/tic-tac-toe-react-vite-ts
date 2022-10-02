// Core
import {
  useReducer,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  ForwardedRef
} from 'react'
// Hooks
import { cloneDeep } from 'lodash-es'
import { useCalculate } from '@/hooks/useCalculate'
// Components
import Board from '@/components/Board'
// Types
import { ReducerActionType } from '@/types/common/global'
import {
  TicTacToePropType,
  TicTacToeRefType,
  StateType
} from '@/types/game'
import { BoardType } from '@/types/board'

const TicTacToe = forwardRef( (props: TicTacToePropType, ref: ForwardedRef<TicTacToeRefType>) => {
  const { ticTacToeWinner } = useCalculate()

  const initialState: StateType = {
    type: props.type,
    xIsNext: true, // 'X' go first
    playing: false,
    finished: false,
    arrBoard: [],
  }

  const reducer = (state: StateType, action: ReducerActionType): StateType => {
    const { type, payload } = action

    switch (type) {
      case 'UPDATE_TYPE':
      case 'PLAYING':
      case 'FINISHED':
        return { ...state, ...payload }
      case 'RESET':
        return { ...initialState, ...payload }
      default: return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const memoArrBoard = useMemo<string[]>(() =>
    Array(props.type * props.type).fill({
      box: '',
      isRewardBox: false
    }),
    [props.type]
  )

  // Paint default grid and update grid by type
  useEffect(() => {
    dispatch({
      type: 'UPDATE_TYPE',
      payload: { type: props.type, arrBoard: memoArrBoard }
    })
  }, [props.type]);

  useImperativeHandle(ref, () => ({
    // Register variable && event for TicTacToe component
    reset: () => resetGame()
  }))

  const handleClick = (index: number): void => {
    const cloneArrBoard: BoardType[] = cloneDeep(state.arrBoard)
    if (state.finished || cloneArrBoard[index].box) return

    cloneArrBoard[index] = {
      ...cloneArrBoard[index],
      box: state.xIsNext ? 'X' : 'O',
    }

    dispatch({
      type: 'PLAYING',
      payload: {
        playing: true,
        xIsNext: !state.xIsNext,
        arrBoard: cloneArrBoard
      }
    })
    !state.playing && props.controller(true)

    handleWinner(cloneArrBoard)
  }

  const handleWinner = (board: BoardType[]): void => {
    const { status, resultBoardWon } = ticTacToeWinner(board)

    if (['finished', 'full-board'].includes(status)) {
      dispatch({
        type: 'FINISHED',
        payload: {
          playing: false,
          finished: true,
          arrBoard: resultBoardWon
        }
      })

      status === 'full-board' && renderMessage('full-board')
    }
  }

  const renderMessage = (message: 'auto' | 'full-board' = 'auto'): string => {
    if (message === 'full-board') {
      return 'Cột sống mà! Hơn thua nhau làm gì bạn ơi...'
    }

    if (state.finished) {
      return 'Winner: ' + (!state.xIsNext ? 'X' : `O`)
    }

    return state.xIsNext ? 'Your turn' : `Enemy's turn`
  }

  const resetGame = (type: 'manual' | 'finished' = 'manual'): void => {
    if (type !== 'finished' && state.playing && !confirm('Are you sure')) return

    dispatch({
      type: 'RESET',
      payload: { arrBoard: memoArrBoard }
    })
    props.controller(false)
  }

  return (
    <div className="game-container"
         style={{ ['--layout-by-type' as string]: state.type }}>

      <h1 className="game-message">{renderMessage()}</h1>

      <div className={
        `board-container
        ${state.finished ? 'finished' : ''}`
      }>
        <Board
          state={state}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
    </div>
  )
})

export default TicTacToe
