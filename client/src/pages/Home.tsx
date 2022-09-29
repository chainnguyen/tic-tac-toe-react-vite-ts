// Core
import { useEffect, useState } from 'react'
// Hooks
import { useSocket } from '@/hooks/useSocket'
import TicTacToe from "@/components/TicTacToe";

function Home() {
  const { socketConnect, socketEmit, socketListen, socketDisconnect } = useSocket()
  let [count, setCount] = useState<number>(0)

  useEffect(() => {
    socketConnect('ws://localhost:5000')

    // when connected, look for when the server emits the updated count
    socketListen('UPDATE_COUNT', (countFromServer: number) => {
      setCount(countFromServer)
    })

    return () => { socketDisconnect() }
  }, [count]);

  const handleCount = () => {
    count++
    socketEmit('SET_COUNT', count)
  }

  return (
    <>
      <h1>Vite + React + Tailwind + TypeScript + Socket + Unit Test</h1>
      <div className="card">
        <button onClick={handleCount}>
          Counting: {count}
        </button>
      </div>

      <section>
        <TicTacToe/>
      </section>
    </>
  )
}

export default Home
