// Core
import { useState, useRef } from 'react'
// Components
import TicTacToe from '@/components/TicTacToe'
// Others
import { LIST_TYPES } from '@/enums/game.enum'
// Types
import { TicTacToeRefType } from '@/types/game'

function Home() {
  const ticTacToeRef = useRef<TicTacToeRefType | null>(null)
  const [typeGame, setTypeGame] = useState<number>(LIST_TYPES[0].type)
  const [playing, setPlaying] = useState<boolean>(false)

  const switchTypeGame = (type: number): void => {
    // Block action while playing game
    if (playing) return
    setTypeGame(type)
  }

  const resetGame = (): void => {
    ticTacToeRef.current?.reset()
  }

  return (
    <>
      <section className="game-control">
        <select className="game-control__type"
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

        <button className="game-control__reset"
                type="button"
                disabled={!playing}
                onClick={resetGame}>
          Reset
        </button>
      </section>

      <section className="sec-game">
        <TicTacToe ref={ticTacToeRef}
                   type={typeGame}
                   controller={setPlaying}
        />
      </section>
    </>
  )
}

export default Home
