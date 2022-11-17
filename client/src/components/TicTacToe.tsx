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
import { useSelector } from 'react-redux'
import { useSocket } from '@/hooks/useSocket'
import { useCalculate } from '@/hooks/useCalculate'

// Components
import Board from '@/components/Board'

// Types
import { IReducerActionType } from '@/types/common/global'
import {
  ITicTacToePropType,
  ITicTacToeRefType,
  IStateType
} from '@/types/game'
import { BoardType } from '@/types/board'
import { RootState } from '@/store/root/root-state'

const TicTacToe = forwardRef( (props: ITicTacToePropType, ref: ForwardedRef<ITicTacToeRefType>) => {
  const initialState: IStateType = {
    type: props.type,
    status: 'unfinished',
    xIsNext: true, // 'X' go first
    playing: false,
    arrBoard: [],
  }

  const reducer = (state: IStateType, action: IReducerActionType): IStateType => {
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

  const { socketEmit, socketListen } = useSocket()
  const isSocketConnected = useSelector((state: { root: RootState }) => state['root'].isSocketConnected)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { ticTacToeWinner } = useCalculate({ type: state.type })

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

  useEffect(() => {
    if (!isSocketConnected) return

    socketListen('CONNECT_COUNTER', (payloadFmServer: number) => {
      console.log('connectCounter - client', payloadFmServer)
    })

    socketListen('UPDATE_PLAYING_ACTION', (payloadFmServer: IStateType) => {
      dispatch({ type: 'PLAYING', payload: payloadFmServer })
    })

    socketListen('UPDATE_WAS_WINNER', (payloadFmServer: IStateType) => {
      dispatch({ type: 'FINISHED', payload: payloadFmServer })
    })

    socketListen('UPDATE_RESET_GAME', (payloadFmServer: IStateType) => {
      dispatch({ type: 'RESET', payload: payloadFmServer })
    })
  }, [isSocketConnected])

  useImperativeHandle(ref, () => ({
    // Register variable && event for TicTacToe component
    reset: () => resetGame()
  }))

  const handleClick = (index: number): void => {
    const cloneArrBoard: BoardType[] = cloneDeep(state.arrBoard)
    if (state.status === 'finished' || cloneArrBoard[index].box) return

    cloneArrBoard[index] = {
      ...cloneArrBoard[index],
      box: state.xIsNext ? 'X' : 'O',
    }

    const payload: object = {
      playing: true,
      xIsNext: !state.xIsNext,
      arrBoard: cloneArrBoard
    }

    // In the case socket can't connect to server or something wrong
    if (!isSocketConnected) {
      dispatch({ type: 'PLAYING', payload })
      !state.playing && props.controller.setPlaying(true)
    }
    socketEmit('PLAYING_ACTION', payload)

    if (!state.playing) {
      socketEmit('GAME_STATUS', 'start')
    }

    handleWinner(cloneArrBoard)
  }

  const handleWinner = (board: BoardType[]): void => {
    const { status, resultBoardWon } = ticTacToeWinner(board)

    if (['finished', 'full-board'].includes(status)) {
      const payload: object = {
        status,
        playing: false,
        arrBoard: resultBoardWon
      }

      !isSocketConnected && dispatch({ type: 'FINISHED', payload })
      socketEmit('WAS_WINNER', payload)
    }
  }

  const renderMessage = (): string => {
    let message: string

    switch (state.status) {
      case 'finished':
        message = 'Winner: ' + (!state.xIsNext ? 'X' : 'O')
        break
      case 'full-board':
        message = 'That life! More than losing, my friend...'
        break
      default:
        message = state.xIsNext ? 'Your turn' : `Enemy's turn`
    }
    return message
  }

  const resetGame = (type: 'manual' | 'finished' = 'manual'): void => {
    if (type !== 'finished' && state.playing && !confirm('Are you sure?')) return

    const payload: object = { arrBoard: memoArrBoard }

    // In the case socket can't connect to server or something wrong
    if (!isSocketConnected) {
      dispatch({ type: 'RESET', payload })
      props.controller.setPlaying(false)
    }
    socketEmit('RESET_GAME', payload)
  }

  return (
    <div className="game-container"
         style={{ ['--layout-by-type' as string]: state.type }}>

      <h1 className="game-message">{renderMessage()}</h1>

      <div className={
        `board-container
        ${state.status === 'finished' ? 'finished' : ''}`
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
