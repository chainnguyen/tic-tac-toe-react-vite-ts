// @ts-ignore
import io from 'socket.io-client'

let socket: any = null

export const useSocket = () => {
  /**
   * Connect server socket
   * @param domain{string}
   */
  const socketConnect = (domain: string = 'localhost:8080') => {
    socket = io(domain)
  }

  /**
   * General function use to broadcast events to the server
   * @param event{string}
   * @param val{string | number}
   */
  const socketEmit = (event: string, val: string | number = '') => {
    socket.emit(event, val)
  }

  /**
   * General function use to listen for events from the server
   * @param event{string}
   * @param fn{object}
   */
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
