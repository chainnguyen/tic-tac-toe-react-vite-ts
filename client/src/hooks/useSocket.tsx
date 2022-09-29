// @ts-ignore
import io from 'socket.io-client'

let socket: any = null

export const useSocket = () => {
  const socketConnect = (domain: string = 'localhost:8080') => {
    socket = io(domain)
  }

  const socketEmit = (event: string, val: string | number = '') => {
    socket.emit(event, val)
  }

  const socketListen = (event: string, fn: object) => {
    socket.on(event, fn)
  }

  const socketDisconnect = () => { socket.disconnect() }

  return {
    socketConnect,
    socketEmit,
    socketListen,
    socketDisconnect
  }
}
