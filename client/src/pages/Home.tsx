// Core
import {
  useState,
  useEffect,
  useRef,
  MutableRefObject
} from 'react'
// Hooks
import { useSocket } from '@/hooks/useSocket'
// Components
import TicTacToe from '@/components/TicTacToe'
// Others
import { LIST_TYPES } from '@/enums/game.enum'

function Home() {
  const {
    socketConnect,
    socketEmit,
    socketListen,
    socketDisconnect
  } = useSocket()

  let [count, setCount] = useState<number>(0)
  const ticTacToeRef = useRef<HTMLDivElement | null>(null)
  const [typeGame, setTypeGame] = useState<number>(LIST_TYPES[0])

  useEffect(() => {
    socketConnect('ws://localhost:5000')

    // When connected, look for when the server emits the updated count
    socketListen('UPDATE_COUNT', (countFromServer: number) => {
      setCount(countFromServer)
    })
    return () => { socketDisconnect() }
  }, [count]);

  const handleCount = () => {
    count++
    socketEmit('SET_COUNT', count)
  }

  /**
   * @param type
   */
  const switchTypeGame = (type: number): void => { setTypeGame(type) }

  const resetGame = (): void => {
    ticTacToeRef.current?.reset()
  }

  return (
    <>
      <section className="game-control">
        <select className="game-control__type"
                value={typeGame}
                onChange={e => switchTypeGame(+e.target.value)}
        >
          {LIST_TYPES.map((type: number) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button type="button" onClick={resetGame}>Reset</button>
      </section>

      <section className="sec-game">
        <TicTacToe ref={ticTacToeRef} type={typeGame}/>
      </section>
    </>
  )
}

export default Home
