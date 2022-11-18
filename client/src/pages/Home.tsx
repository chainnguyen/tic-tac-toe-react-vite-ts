// Core
import { useState, useRef, useEffect } from 'react'
// Hooks
import { useSocket } from '@/hooks/useSocket'
// Components
import TicTacToe from '@/components/TicTacToe'
// Others
import { LIST_TYPES } from '@/enums/game.enum'
import { SERVER_PORT } from '@/enums/socket.enum'
// Types
import { ITicTacToeRefType, StatusGame } from '@/types/game'
import { ICommonProps } from '@/types/common/global'

function Home({ onClickForTest }: ICommonProps) {
  const {
    socketConnect,
    socketEmit,
    socketListen,
    socketDisconnect
  } = useSocket()

  const ticTacToeRef = useRef<ITicTacToeRefType | null>(null)
  const [typeGame, setTypeGame] = useState<number>(LIST_TYPES[0].type)
  const [playing, setPlaying] = useState<boolean>(false)
  const [status, setStatus] = useState<StatusGame>('unfinished')

  // Initial socket
  useEffect( () => {
    socketConnect(SERVER_PORT)
      .then((): void => eventsCallCenter())
    return () => { socketDisconnect() }
  },[])

  const eventsCallCenter = () => {
    socketListen('UPDATE_TYPE_GAME', (typeFromServer: number) => {
      setTypeGame(typeFromServer)
    })

    socketListen('UPDATE_GAME_STATUS', (statusFromServer: string) => {
      switch (statusFromServer) {
        case 'start':
          setPlaying(true)
          break;
        case 'finished':
        case 'full-board':
          setPlaying(false)
          setStatus(statusFromServer)
          break;
        default:
          setPlaying(false)
          setStatus('unfinished')
      }
    })
  }

  const switchTypeGame = (type: number): void => {
    // Block action while playing game
    if (playing) return
    socketEmit('SWITCH_TYPE_GAME', type)
  }

  const resetGame = (): void => {
    onClickForTest && onClickForTest()
    ticTacToeRef.current?.reset()
  }

  return (
    <>
      <section className="game-control">
        <select data-testid="gameControl"
                className="game-control__type"
                disabled={playing}
                value={typeGame}
                onChange={e => switchTypeGame(+e.target.value)}
        >
          {LIST_TYPES.map((item) => (
            <option key={item.type} value={item.type}>
              {item.type}
            </option>
          ))}
        </select>

        <button data-testid="resetGameButton"
                className="game-control__reset"
                type="button"
                disabled={!playing && status === 'unfinished'}
                onClick={resetGame}>
          Reset
        </button>
      </section>

      <section className="sec-game">
        <TicTacToe ref={ticTacToeRef}
                   type={typeGame}
                   controller={{ setPlaying }}
        />
      </section>
    </>
  )
}

export default Home
