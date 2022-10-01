// Core
import {
  useReducer,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  ForwardedRef
} from 'react'
// Components
import Board from '@/components/Board'
// Types
import { ReducerActionType } from '@/types/common/global'
import {
  TicTacToePropType,
  TicTacToeRefType,
  StateType
} from '@/types/game'

const TicTacToe = forwardRef( (props: TicTacToePropType, ref: ForwardedRef<TicTacToeRefType>) => {
  const initialState: StateType = {
    type: props.type,
    xIsNext: true, // 'X' go first
    playing: false,
    arrBoard: [],
  }

  const reducer = (state: StateType, action: ReducerActionType): StateType => {
    const { type, payload } = action

    switch (type) {
      case 'UPDATE_TYPE':
      case 'PLAYING':
        return { ...state, ...payload }
      case 'RESET':
        return { ...initialState, ...payload }
      default: return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const memoArrBoard = useMemo<string[]>(() =>
    Array(props.type * props.type).fill(''),
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
    const updateArrBoard: string[] = [...state.arrBoard]
    if (calculateWinner(updateArrBoard) || updateArrBoard[index]) return

    updateArrBoard[index] = state.xIsNext ? 'X' : 'O'
    dispatch({
      type: 'PLAYING',
      payload: {
        playing: true,
        xIsNext: !state.xIsNext,
        arrBoard: updateArrBoard
      }
    })
    props.controller(true)
  }

  const calculateWinner = (board: string[]): boolean => {
    return false
  }

  const resetGame = (): void => {
    if (state.playing && !confirm('Are you sure')) return

    dispatch({
      type: 'RESET',
      payload: { arrBoard: memoArrBoard }
    })
    props.controller(false)
  }

  return (
    <div className="board-container"
         style={{ ['--layout-by-type' as string]: state.type }}>
      <Board
        state={state}
        onClick={(i: number) => handleClick(i)}
      />
    </div>
  )
})

export default TicTacToe
